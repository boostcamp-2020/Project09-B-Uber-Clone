import React, { useState, useEffect, useCallback } from 'react';
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
  const { uid, request, tel } = useSelector(
    (state: { driverMatchingInfo: DriverMatchingInfo }) => state.driverMatchingInfo,
  );
  const [setUserOnBoard] = useMutation(USER_ON_BOARD);
  const [boarding, setBoarding] = useState(false);
  const [visible, setVisible] = useState(false);
  const [startLocationName, setStartLocation] = useState('');
  const { loaded } = useGoogleMapApiState();
  const location = useSelector((state: { location: Location }) => state.location, shallowEqual);
  const [updateDriverLocation] = useMutation(UPDATE_DRIVER_LOCATION);

  const arrive = useCallback(() => {
    setVisible(true);
    // TODO: 도착 완료 처리
  }, []);

  const takeUser = useCallback(async () => {
    try {
      const {
        data: {
          userOnBoard: { success, message },
        },
      } = await setUserOnBoard({
        variables: { uid },
      });
      if (success) setBoarding(true);
      else Toast.show(message);
    } catch (error) {
      console.error(error);
    }
  }, [uid]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: {
            updateDriverLocation: { success, message },
          },
        } = await updateDriverLocation({
          variables: { location, uid },
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
    if (request) {
      const { startLocation, endLocation } = request;
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
                <Button type="primary" onClick={arrive}>
                  목적지 도착
                </Button>
              </BottomOverlay>
            </>
          ) : (
            <>
              <TopOverlay>
                <StartLocationInfo startLocation={startLocationName} />
                {tel && <CallButton phone={tel} />}
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
