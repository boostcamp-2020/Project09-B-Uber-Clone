import React, { useState, useEffect, useCallback } from 'react';
import { useSubscription, useMutation } from '@apollo/client';
import MatchedDriverData from '@components/userMatching/MatchedDriverData';
import MapContainer from '@containers/MapContainer';
import { Modal, Toast } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PathPoint, PreData } from '@custom-types';
import MatchingWrapper from '@components/userMatching/MatchingWrapper';
import RequestInfo from '@components/userMatching/RequestInfo';
import { useGoogleMapApiState } from 'src/contexts/GoogleMapProvider';
import { SAVE_USER_HISTORY } from '@queries/user/userHistory';
import { clearPathPoint } from '@stores/modules/pathPoint';
import { clearPreData } from '@stores/modules/preData';
import {
  MATCHED_TAXI,
  TAXI_LOCATION,
  REQUEST_MATCH,
  MATCHING_SUBSCRIPTION,
  STOP_MATCHING,
} from '@queries/user/userMatching';

const UserMatchingPage: React.FC = () => {
  const pathPoint = useSelector((state: { pathPoint: PathPoint }) => state.pathPoint);
  const history = useHistory();
  const [requestMatch] = useMutation(REQUEST_MATCH);
  const [stopMatching] = useMutation(STOP_MATCHING);
  const { loading, error } = useSubscription(MATCHING_SUBSCRIPTION);
  const { data: taxiData, error: taxiDataError } = useSubscription(MATCHED_TAXI);
  const { data: taxiLocationData, error: taxiLatlngError } = useSubscription(TAXI_LOCATION);
  const [requestCount, setRequestCount] = useState(MAX_REQUEST_COUNT - 1);
  const [isMatched, setMatchState] = useState(false);
  const [taxiInfo, setTaxiInfo] = useState({ id: '', name: '', carModel: '', carColor: '', plateNumber: '' });
  const [taxiLocation, setTaxiLocation] = useState(undefined);
  const [isMatchCanceled, setMatchCancel] = useState(false);
  const { loaded } = useGoogleMapApiState();
  const [saveUserHistory] = useMutation(SAVE_USER_HISTORY);
  const preData = useSelector((state: { preData: PreData }) => state.preData);
  const [request, setRequest] = useState({});
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState<string>('');
  const [currentAlert, setCurrentAlert] = useState<any>(undefined);

  useEffect(() => {
    (async () => await registMatchingList())();
  }, []);

  useEffect(() => {
    if (taxiData?.userMatchingSub) {
      setTaxiLocation(taxiData.userMatchingSub.location);
      setMatchState(true);
      setTaxiInfo(taxiData.userMatchingSub);
    }
  }, [taxiData, taxiInfo]);

  useEffect(() => {
    if (taxiDataError && !taxiLatlngError) Toast.fail('택시 정보를 확인할 수 없습니다.');
  }, [taxiDataError]);

  useEffect(() => {
    if (taxiLocationData?.driverLocationSub) {
      const taxiLocationSubData = taxiLocationData.driverLocationSub;
      setTaxiLocation(taxiLocationSubData);
      if (taxiLocationSubData.board) showOnBoardAlert();
      else if (taxiLocationSubData.arrive) showArriveAlert();
    }
  }, [taxiLocationData]);

  useEffect(() => {
    if (taxiData && taxiLatlngError) Toast.fail('택시 위치를 확인할 수 없습니다.');
  }, [taxiLatlngError]);

  useEffect(() => {
    const timer = setInterval(async () => {
      await registMatchingList();
      setRequestCount(requestCount - 1);
    }, MATCHING_INTERVAL);

    if (!loading || isMatchCanceled) clearInterval(timer);
    return () => {
      clearInterval(timer);
      if (requestCount === 0) {
        (async () => {
          await cancelMatching();
          Toast.show('매칭할 수 있는 드라이버가 없습니다.', Toast.SHORT);
        })();
      }
    };
  }, [requestCount]);

  const registMatchingList = async () => {
    setRequest({
      startLocation: {
        name: pathPoint.startPointName,
        latlng: {
          ...pathPoint.startPoint,
        },
      },
      endLocation: {
        name: pathPoint.endPointName,
        latlng: {
          ...pathPoint.endPoint,
        },
      },
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const {
          data: {
            requestMatching: { _, __ },
          },
        } = await requestMatch({ variables: { request } });
      } catch (error) {
        console.error(error);
        Toast.fail('매칭을 다시 시도 해주세요.', Toast.SHORT);
      }
    })();
  }, [request]);

  useEffect(() => {
    if (error) onErrorHandler();
  }, [error]);

  const onErrorHandler = useCallback(() => {
    Toast.show('알 수 없는 오류가 발생했습니다.', Toast.SHORT);
    history.push('/user/map');
  }, []);

  const saveHistory = useCallback(async () => {
    const info = {
      request: request,
      fee: preData.info.fee,
      carModel: taxiInfo.carModel,
      plateNumber: taxiInfo.plateNumber,
      startTime: startTime,
      endTime: new Date().toString(),
    };
    const {
      data: { saveUserHistory: result },
    } = await saveUserHistory({ variables: { info } });
    return result;
  }, [request, preData, taxiInfo, startTime]);

  const showOnBoardAlert = useCallback(() => {
    setStartTime(new Date().toString());
    const alertInstance = alertModal('탑승 완료', '5초 후 창이 닫힙니다.', modalButton(alertModal('', '').close));
    setCurrentAlert(alertInstance);
    setTimeout(alertInstance.close, 5000);
  }, []);

  const showArriveAlert = useCallback(async () => {
    if (currentAlert) currentAlert.close();
    const onClose = (goToMainTimeout: number) => () => {
      clearTimeout(goToMainTimeout);
      history.push('/user');
    };
    const { success, message } = await saveHistory();

    if (success) {
      dispatch(clearPathPoint());
      dispatch(clearPreData());
      const goToMainTimeout = setTimeout(() => {
        alertInstance.close();
        history.push('/user');
      }, 5000);
      const alertInstance = alertModal(
        '목적지 도착',
        '5초 후 메인화면으로 이동합니다.',
        modalButton(onClose(goToMainTimeout)),
      );
    } else Toast.show(message);
  }, [currentAlert, saveHistory]);

  const cancelMatching = useCallback(async () => {
    try {
      const {
        data: {
          stopMatching: { success, message },
        },
      } = await stopMatching();
      if (!success) console.error(message);
    } catch (error) {
      console.error(error);
    } finally {
      setMatchCancel(true);
      history.push('/user/map');
    }
  }, []);

  const onClickHandler = useCallback(async () => {
    await cancelMatching();
    Toast.show('호출을 취소했습니다.', Toast.SHORT);
  }, [cancelMatching]);

  return (
    <>
      {loaded && (
        <>
          <RequestInfo startPoint={pathPoint.startPointName || ''} endPoint={pathPoint.endPointName || ''} />
          {loading && <MatchingWrapper onClickHandler={onClickHandler} />}
          <MapContainer isMatched={isMatched} taxiLocation={taxiLocation} />
          {isMatched && <MatchedDriverData taxiInfo={taxiInfo} />}
        </>
      )}
    </>
  );
};

const alertModal = Modal.alert;
const modalButton = (cb: any) => {
  return [
    {
      text: '확인',
      onPress: cb,
      style: 'default',
    },
  ];
};

const MAX_REQUEST_COUNT = 6;
const MATCHING_INTERVAL = 10000;

export default UserMatchingPage;
