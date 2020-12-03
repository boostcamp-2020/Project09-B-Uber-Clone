import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import MapContainer from '../../containers/MapContainer';
import InputPlaces from '@components/userMain/InputPlaces';
import PreReqData from '@components/userMain/PreReqData';
import { PreData } from '@custom-types';
import { useSelector } from 'react-redux';

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '',
  libraries: ['places'],
});

const UserMainPage: React.FC = () => {
  const preData = useSelector((state: { preData: PreData }) => state.preData);
  const [googleMapApi, setGoogleMapApi]: any = useState({ loaded: false, directionRenderer: null });
  const info = preData.info;

  const initialScriptLoad = async () => {
    await loader.load();
    setGoogleMapApi({ loaded: true, directionRenderer: new google.maps.DirectionsRenderer({ suppressMarkers: true }) });
  };

  useEffect(() => {
    initialScriptLoad();
  }, []);

  return (
    <>
      {googleMapApi.loaded && (
        <>
          <InputPlaces />
          <MapContainer directionRenderer={googleMapApi.directionRenderer} />
          {preData.isSetPath && <PreReqData time={info.time} fee={info.fee} />}
        </>
      )}
    </>
  );
};

export default UserMainPage;
