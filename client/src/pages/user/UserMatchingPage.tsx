import React, { useState, useEffect } from 'react';
import { gql, useSubscription, useMutation } from '@apollo/client';
import { Loader } from '@googlemaps/js-api-loader';
import MatchedDriverData from '@components/userMatching/MatchedDriverData';
import MapContainer from '../../containers/MapContainer';
import { Modal, Toast } from 'antd-mobile';
import Matching from '@components/userMatching/Matching';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PathPoint } from '@custom-types';

const alertModal = Modal.alert;

const MAX_REQUEST_COUNT = 6;
const MATCHING_INTERVAL = 1000;

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '',
  libraries: ['places'],
});

const MATCHED_TAXI = gql`
  subscription {
    userMatchingSub {
      id
      name
      carModel
      carColor
      plateNumber
    }
  }
`;

const TAXI_LOCATION = gql`
  subscription($id: string) {
    driverLocationSub(taxiId: $id) {
      lat
      lng
    }
  }
`;

const UserMatchingPage: React.FC = () => {
  const pathPoint = useSelector((state: { pathPoint: PathPoint }) => state.pathPoint);
  const history = useHistory();
  const [requestMatch] = useMutation(REQUEST_MATCH);
  const { loading, error, data } = useSubscription(MATCHING_SUBSCRIPTION);
  const { data: taxiData, error: taxiDataError } = useSubscription(MATCHED_TAXI);
  const { data: taxiLatlng, error: taxiLatlngError } = useSubscription(TAXI_LOCATION);
  const [googleMapApi, setGoogleMapApi]: any = useState({ loaded: false, directionRenderer: null });
  const [requestCount, setRequestCount] = useState(MAX_REQUEST_COUNT - 1);
  const [isMatched, setMatchState] = useState(false);
  const [taxiInfo, setTaxiInfo] = useState({ id: '', name: '', carModel: '', carColor: '', plateNumber: '' });
  const [taxiLocation, setTaxiLocation] = useState(undefined);
  const [boarding, setBoarding] = useState(false);
  const [modal, setModal] = useState(false);

  // TODO : DELETE THIS METHOD
  const setBoardingAfterTenSecToTest = () => {
    setTimeout(() => {
      setBoarding(true);
      setMatchState(false);
    }, 3000);
  };

  const initialScriptLoad = async () => {
    await loader.load();
    setGoogleMapApi({ loaded: true, directionRenderer: new google.maps.DirectionsRenderer({ suppressMarkers: true }) });
  };

  useEffect(() => {
    initialScriptLoad();
    (async () => await registMatchingList())();
  }, []);

  useEffect(() => {
    if (taxiData?.userMatchingSub) {
      setMatchState(true);
      setTaxiInfo(taxiData.userMatchingSub);
      setBoardingAfterTenSecToTest();
    }
  }, [taxiData]);

  useEffect(() => {
    if (taxiDataError && !taxiLatlngError) Toast.fail('택시 정보를 확인할 수 없습니다.');
  }, [taxiDataError]);

  useEffect(() => {
    if (taxiLatlng?.driverLocationSub) {
      setTaxiLocation(taxiLatlng);
    }
  }, [taxiLatlng]);

  useEffect(() => {
    if (taxiData && taxiLatlngError) Toast.fail('택시 위치를 확인할 수 없습니다.');
  }, [taxiLatlngError]);

  useEffect(() => {
    const timer = setInterval(async () => {
      await registMatchingList();
      setRequestCount(requestCount - 1);
    }, MATCHING_INTERVAL);

    if (!loading || isMatched || boarding) clearInterval(timer);
    return () => {
      clearInterval(timer);
      if (requestCount === 0) {
        history.push('/user/map');
        Toast.show('매칭할 수 있는 드라이버가 없습니다.', Toast.SHORT);
      }
    };
  }, [requestCount]);

  useEffect(() => {
    if (!modal && boarding) showAlert();
  }, [modal, boarding]);

  const registMatchingList = async () => {
    const request = {
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
    };

    try {
      const {
        data: {
          requestMatching: { success, message },
        },
      } = await requestMatch({ variables: { request } });
      return [success, message];
    } catch (error) {
      console.error(error);
      return [false, '알 수 없는 오류가 발생했습니다.'];
    }
  };

  useEffect(() => {
    if (error) onErrorHandler();
  }, [error]);

  const onErrorHandler = () => {
    Toast.show('알 수 없는 오류가 발생했습니다.', Toast.SHORT);
    history.push('/user/map');
  };

  const showAlert = () => {
    setModal(true);
    const alertInstance = alertModal('탑승 완료', '5초 후 홈으로 돌아갑니다.', [
      {
        text: '홈으로',
        onPress: () => {
          setBoarding(false);
          setModal(false);
          history.push('/user');
        },
        style: 'default',
      },
    ]);

    setTimeout(() => {
      alertInstance.close();
      setBoarding(false);
      setModal(false);
      history.push('/user');
    }, 5000);
  };

  return (
    <>
      {googleMapApi.loaded && (
        <>
          {loading && <Matching />}
          <MapContainer
            isMatched={isMatched}
            taxiLocation={taxiLocation}
            directionRenderer={googleMapApi.directionRenderer}
          />
          {isMatched && <MatchedDriverData taxiInfo={taxiInfo} />}
        </>
      )}
    </>
  );
};

const REQUEST_MATCH = gql`
  mutation requestMatching($request: UserRequestInput) {
    requestMatching(request: $request) {
      success
      message
    }
  }
`;

const MATCHING_SUBSCRIPTION = gql`
  subscription {
    userMatchingSub {
      id
      name
      carModel
      carColor
      plateNumber
    }
  }
`;

export default UserMatchingPage;
