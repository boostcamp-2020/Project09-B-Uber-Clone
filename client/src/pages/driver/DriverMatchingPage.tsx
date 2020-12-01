import React from 'react';
import MapContainer from '../../containers/MapContainer';
import CallButton from '@components/common/CallButton';
import styled from 'styled-components';

const DriverMatchingPage: React.FC = () => {
  return (
    <>
      <MapContainer />
      <Overlay>
        <CallButton phone="010-0000-0000" />
      </Overlay>
    </>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export default DriverMatchingPage;
