import React from 'react';
import MapContainer from '../../containers/MapContainer';
import CallButton from '@components/driverMatching/CallButton';

const DriverMatchingPage: React.FC = () => {
  return (
    <MapContainer>
      <CallButton phone="010-0000-0000" />
    </MapContainer>
  );
};

export default DriverMatchingPage;
