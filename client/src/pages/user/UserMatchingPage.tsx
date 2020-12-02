import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import MapContainer from 'src/containers/MapContainer';
import Matching from '@components/userMatching/Matching';

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '',
  libraries: ['places'],
});

const UserMatchingPage: React.FC = () => {
  const [googleMapApi, setGoogleMapApi]: any = useState({ loaded: false, directionRenderer: null });

  const initialScriptLoad = async () => {
    await loader.load();
    setGoogleMapApi({ loaded: true, directionRenderer: new google.maps.DirectionsRenderer() });
  };

  useEffect(() => {
    initialScriptLoad();
  }, []);

  return (
    <>
      <Matching />
      <MapContainer directionRenderer={googleMapApi.directionRenderer} />
    </>
  );
};

export default UserMatchingPage;
