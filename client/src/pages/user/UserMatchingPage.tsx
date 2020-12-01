import React, { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import MatchedDriverData from '@components/UserMatching/MatchedDriverData';
import MapContainer from '../../containers/MapContainer';

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '',
  libraries: ['places'],
});

const UserMatchingPage: React.FC = () => {
  const [apiLoaded, setApiLoaded] = useState(false);

  const initialScriptLoad = async () => {
    await loader.load();
    setApiLoaded(true);
  };

  useEffect(() => {
    initialScriptLoad();
  }, []);

  // TODO : 매칭이 성사되면(드라이버 수락 후) MatchedDriverData 노출
  return (
    <>
      {apiLoaded && (
        <>
          <MapContainer />
          <MatchedDriverData />
        </>
      )}
    </>
  );
};

export default UserMatchingPage;
