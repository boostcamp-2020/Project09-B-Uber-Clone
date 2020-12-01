import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import MapContainer from '../../containers/MapContainer';
import InputPlaces from '@components/userMain/InputPlaces';
import PreReqData from '@components/userMain/PreReqData';

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '',
  libraries: ['places'],
});

const UserMainPage: React.FC = () => {
  const [apiLoaded, setApiLoaded] = useState(false);

  const initialScriptLoad = async () => {
    await loader.load();
    setApiLoaded(true);
  };

  useEffect(() => {
    initialScriptLoad();
  }, []);

  return (
    <>
      {apiLoaded && (
        <>
          <InputPlaces />
          <MapContainer />
          {/* TODO : 출발/도착지 모두 선택시 노출 */}
          <PreReqData />;
        </>
      )}
    </>
  );
};

export default UserMainPage;
