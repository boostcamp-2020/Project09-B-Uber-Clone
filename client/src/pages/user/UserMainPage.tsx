import React from 'react';
import MapContainer from '../../containers/MapContainer';
import InputPlaces from '@components/userMain/InputPlaces';

const UserMainPage: React.FC = () => {
  return (
    <>
      <InputPlaces />
      <MapContainer />;
    </>
  );
};

export default UserMainPage;
