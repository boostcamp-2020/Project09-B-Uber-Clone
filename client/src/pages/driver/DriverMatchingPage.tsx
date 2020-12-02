import React, { useState } from 'react';
import MapContainer from '../../containers/MapContainer';
import CallButton from '@components/common/CallButton';
import styled from 'styled-components';
import { Button } from 'antd-mobile';

const DriverMatchingPage: React.FC = () => {
  const [state, setState] = useState(false);

  return (
    <>
      <MapContainer />
      {state ? (
        <> // TODO: 승객 탑승 후 컴포넌트</>
      ) : (
        <>
          <TopOverlay>
            <CallButton phone="010-0000-0000" />
          </TopOverlay>
          <BottomOverlay>
            <Button type="primary" onClick={() => setState(true)}>
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
