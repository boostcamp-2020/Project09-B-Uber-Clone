import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateStartPoint, updateEndPoint } from '@stores/modules/pathPoint';
import { useMutation } from '@apollo/client';
import { USER_ON_BOARD } from '@queries/driver/driverMatching';
import MapContainer from '@containers/MapContainer';
import CallButton from '@components/common/CallButton';
import StartLocationInfo from '@components/driverMatching/StartLocationInfo';
import styled from 'styled-components';
import { Button, Toast } from 'antd-mobile';
import PaymentModal from '@components/driverMap/PaymentModal';
import { useGoogleMapApiState } from 'src/contexts/GoogleMapProvider';
import { useSelector } from 'react-redux';
import { DriverMatchingInfo } from '@custom-types';

const DriverMatchingPage: React.FC = () => {
  const dispatch = useDispatch();
  const matchingInfo = useSelector((state: { driverMatchingInfo: DriverMatchingInfo }) => state.driverMatchingInfo);
  const [setUserOnBoard] = useMutation(USER_ON_BOARD);
  const [boarding, setBoarding] = useState(false);
  const [visible, setVisible] = useState(false);
  const { loaded } = useGoogleMapApiState();
  const [userRequest, setUserRequest] = useState<DriverMatchingInfo>({
    uid: undefined,
    request: undefined,
  });
  const arrive = useCallback(() => {
    setVisible(true);
    // TODO: 도착 완료 처리
  }, []);

  const takeUser = async () => {
    const { uid } = userRequest;
    const {
      data: {
        userOnBoard: { success, message },
      },
    } = await setUserOnBoard({
      variables: { uid },
    });
    if (success) setBoarding(true);
    else Toast.show(message);
  };

  useEffect(() => {
    if (matchingInfo) {
      const { uid, request } = matchingInfo;
      setUserRequest({ uid, request });
      if (request) {
        dispatch(updateStartPoint(request.startLocation.latlng));
        dispatch(updateEndPoint(request.endLocation.latlng));
      }
    } else Toast.fail('유저 정보를 확인할 수 없습니다.');
  }, [matchingInfo]);

  return (
    <>
      {loaded && (
        <>
          <MapContainer />
          {boarding ? (
            <>
              <PaymentModal visible={visible} />
              <BottomOverlay>
                <Button type="primary" onClick={arrive}>
                  목적지 도착
                </Button>
              </BottomOverlay>
            </>
          ) : (
            <>
              <TopOverlay>
                <StartLocationInfo startLocation={userRequest.request ? userRequest.request.startLocation.name : ''} />
                <CallButton phone="010-0000-0000" />
              </TopOverlay>
              <BottomOverlay>
                <Button type="primary" onClick={takeUser}>
                  승객 탑승 완료
                </Button>
              </BottomOverlay>
            </>
          )}
        </>
      )}
    </>
  );
};

const TopOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 10px;
`;

const BottomOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 10px;
`;

export default DriverMatchingPage;
