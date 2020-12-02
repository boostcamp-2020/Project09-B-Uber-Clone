import React, { useState, useEffect } from 'react';
import { gql, useSubscription } from '@apollo/client';
import { Loader } from '@googlemaps/js-api-loader';
import MatchedDriverData from '@components/UserMatching/MatchedDriverData';
import MapContainer from '../../containers/MapContainer';

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '',
  libraries: ['places'],
});

const MATCHED_TAXI = gql`
  subscription {
    userMatchingSub {
      id
      name
      carModel
      carColor
      plateNumber
    }
  }
`;

const UserMatchingPage: React.FC = () => {
  const { data, error } = useSubscription(MATCHED_TAXI);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [isMatched, setMatchState] = useState(false);
  const [taxiInfo, setTaxiInfo] = useState(undefined);

  const initialScriptLoad = async () => {
    await loader.load();
    setApiLoaded(true);
  };

  useEffect(() => {
    initialScriptLoad();
  }, []);

  useEffect(() => {
    if (data?.userMatchingSub) {
      setMatchState(true);
      // setTaxiInfo(data);
    }
  }, [data]);

  // TODO : 매칭이 성사되면(드라이버 수락 후) MatchedDriverData 노출
  return (
    <>
      {apiLoaded && (
        <>
          <MapContainer />
          {isMatched && <MatchedDriverData />}
        </>
      )}
    </>
  );
};

export default UserMatchingPage;
