import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { updateStartPoint, updateEndPoint } from '@stores/modules/pathPoint';
import { gql, useSubscription } from '@apollo/client';
import { USER_ON_BOARD } from '@queries/driver/driverMatching';
import MapContainer from '@containers/MapContainer';
import CallButton from '@components/common/CallButton';
import StartLocationInfo from '@components/driverMatching/StartLocationInfo';
import styled from 'styled-components';
import { Button, Toast } from 'antd-mobile';
import { Response } from '@custom-types';
import PaymentModal from '@components/driverMap/PaymentModal';
import { useGoogleMapApiState } from 'src/contexts/GoogleMapProvider';

const MATCHED_USER = gql`
  subscription {
    driverServiceSub {
      uid
      request {
        startLocation
        endLocation
      }
    }
  }
`;

const DriverMatchingPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data, error } = useSubscription(MATCHED_USER);
  const [boarding, setBoarding] = useState(false);
  const [visible, setVisible] = useState(false);
  const { loaded } = useGoogleMapApiState();

  const arrive = () => {
    setVisible(true);
    // TODO: 도착 완료 처리
  };

  const [setUserOnBoard] = useMutation(USER_ON_BOARD);

  const takeUser = async () => {
    const { success, message }: Response = (await setUserOnBoard({
      variables: { uid: 'USER_ID_FROM_STORE' },
    })) as Response;
    if (success) setBoarding(true);
    else Toast.show(message);
  };
  const [userRequest, setUserRequest] = useState({
    uid: '',
    startLocation: { name: '', Latlng: { lat: '', lng: '' } },
    endLocation: { name: '', Latlng: { lat: '', lng: '' } },
  });
  useEffect(() => {
    if (data?.driverServiceSub) {
      const requsetData = data.userMatchingSub;
      const { startLocation, endLocation } = requsetData.request;
      setUserRequest({ uid: requsetData.uid, startLocation: startLocation, endLocation: endLocation });
      dispatch(updateStartPoint(startLocation.Latlng));
      dispatch(updateEndPoint(endLocation.Latlng));
    }
  }, [data]);

  useEffect(() => {
    if (error) Toast.fail('유저 정보를 확인할 수 없습니다.');
  }, [error]);

  return (
    <>
      {loaded && (
        <>
          <MapContainer />
          {boarding ? (
            <>
              <PaymentModal visible={visible} />
              <BottomOverlay>
                <Button type="primary" onClick={() => arrive()}>
                  목적지 도착
                </Button>
              </BottomOverlay>
              return (
            </>
          ) : (
            <>
              <TopOverlay>
                <StartLocationInfo startLocation={userRequest.startLocation.name} />
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
