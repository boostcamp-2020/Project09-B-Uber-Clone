import React, { useState } from 'react';
import MapContainer from '../../containers/MapContainer';
import CallButton from '@components/common/CallButton';
import styled from 'styled-components';
import { Button } from 'antd-mobile';
import PaymentModal from '@components/driverMap/PaymentModal';

const DriverMatchingPage: React.FC = () => {
  const [boarding, setBoarding] = useState(false);
  const [visible, setVisible] = useState(false);

  const arrive = () => {
    setVisible(true);
    // TODO: 도착 완료 처리
  };

  return (
    <>
      <MapContainer />
      {boarding ? (
        <>
          <PaymentModal visible={visible} onClose={() => setVisible(false)} />
          <BottomOverlay>
            <Button type="primary" onClick={() => arrive()}>
              목적지 도착
            </Button>
          </BottomOverlay>
        </>
      ) : (
        <>
          <TopOverlay>
            <CallButton phone="010-0000-0000" />
          </TopOverlay>
          <BottomOverlay>
            <Button type="primary" onClick={() => setBoarding(true)}>
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
