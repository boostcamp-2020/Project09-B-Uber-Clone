import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { USER_ON_BOARD } from '@queries/driver/driverMatching';
import MapContainer from '../../containers/MapContainer';
import CallButton from '@components/common/CallButton';
import styled from 'styled-components';
import { Button, Toast } from 'antd-mobile';
import { Response } from '@custom-types';

const DriverMatchingPage: React.FC = () => {
  const [boarding, setBoarding] = useState(false);
  const [setUserOnBoard] = useMutation(USER_ON_BOARD);

  const takeUser = async () => {
    const { success, message }: Response = (await setUserOnBoard({
      variables: { uid: 'USER_ID_FROM_STORE' },
    })) as Response;
    if (success) setBoarding(true);
    else Toast.show(message);
  };

  return (
    <>
      <MapContainer />
      {boarding ? (
        <> // TODO: 승객 탑승 후 컴포넌트</>
      ) : (
        <>
          <TopOverlay>
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
