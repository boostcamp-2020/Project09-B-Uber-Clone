import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useMutation } from '@apollo/client';
import { updateStartPoint, updateEndPoint } from '@stores/modules/pathPoint';
import { USER_ON_BOARD, UPDATE_DRIVER_LOCATION } from '@queries/driver/driverMatching';
import MapContainer from '@containers/MapContainer';
import CallButton from '@components/common/CallButton';
import StartLocationInfo from '@components/driverMatching/StartLocationInfo';
import styled from 'styled-components';
import { Button, Toast } from 'antd-mobile';
import { DriverMatchingInfo } from '@custom-types';
import PaymentModal from '@components/driverMap/PaymentModal';
import { useGoogleMapApiState } from 'src/contexts/GoogleMapProvider';

const DriverMatchingPage: React.FC = () => {
  const dispatch = useDispatch();
  const [boarding, setBoarding] = useState(false);
  const [visible, setVisible] = useState(false);
  const [startLocationName, setStartLocation] = useState('');
  const { loaded } = useGoogleMapApiState();
  const location = useSelector((state: { location: Location }) => state.location, shallowEqual);
  const matchingInfo = useSelector((state: { driverMatchingInfo: DriverMatchingInfo }) => state.driverMatchingInfo);

  const arrive = () => {
    setVisible(true);
    // TODO: 도착 완료 처리
  };

  const [setUserOnBoard] = useMutation(USER_ON_BOARD);
  const [updateDriverLocation] = useMutation(UPDATE_DRIVER_LOCATION);

  const takeUser = async () => {
    try {
      const {
        data: {
          userOnBoard: { success, message },
        },
      } = await setUserOnBoard({
        variables: { uid: matchingInfo.uid },
      });
      if (success) setBoarding(true);
      else Toast.show(message);
    } catch (error) {
      console.error(error);
    }
  };
  // const [userRequest, setUserRequest] = useState({
  //   uid: '',
  //   startLocation: { name: '', Latlng: { lat: '', lng: '' } },
  //   endLocation: { name: '', Latlng: { lat: '', lng: '' } },
  // });

  useEffect(() => {
    (async () => {
      try {
        const {
          data: {
            updateDriverLocation: { success, message },
          },
        } = await updateDriverLocation({
          variables: { location, uid: matchingInfo.uid },
        });
        if (!success) {
          console.error(message);
          Toast.show('네트워크를 확인 해주세요.', Toast.SHORT);
        }
      } catch (error) {
        console.error(error);
        Toast.show('네트워크를 확인 해주세요.', Toast.SHORT);
      }
    })();
  }, [location]);

  useEffect(() => {
    if (matchingInfo.request) {
      const { startLocation, endLocation } = matchingInfo.request;
      dispatch(updateStartPoint(startLocation.latlng));
      dispatch(updateEndPoint(endLocation.latlng));
      setStartLocation(startLocation.name);
    }
  }, []);

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
                <StartLocationInfo startLocation={startLocationName} />
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
