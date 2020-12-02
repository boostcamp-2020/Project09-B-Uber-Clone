import React from 'react';
import MapContainer from 'src/containers/MapContainer';
import Matching from '@components/userMatching/Matching';

const UserMatchingPage: React.FC = () => {
  return (
    <>
      <Matching />
      <MapContainer />
    </>
  );
};

export default UserMatchingPage;
