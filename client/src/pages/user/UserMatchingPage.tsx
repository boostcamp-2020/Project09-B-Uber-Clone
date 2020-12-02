import React, { useState, useEffect } from 'react';
import { gql, useSubscription } from '@apollo/client';
import { Loader } from '@googlemaps/js-api-loader';
import MatchedDriverData from '@components/UserMatching/MatchedDriverData';
import MapContainer from '../../containers/MapContainer';
import { Toast } from 'antd-mobile';

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

const TAXI_LOCATION = gql`
  subscription($id: string) {
    driverLocationSub(taxiId: $id) {
      lat
      lng
    }
  }
`;

const UserMatchingPage: React.FC = () => {
  const { data: taxiData, error: taxiDataError } = useSubscription(MATCHED_TAXI);
  const { data: taxiLatlng, error: taxiLatlngError } = useSubscription(TAXI_LOCATION);
  const [apiLoaded, setApiLoaded] = useState(false);
  const [isMatched, setMatchState] = useState(false);
  const [taxiInfo, setTaxiInfo] = useState({ id: '', name: '', carModel: '', carColor: '', plateNumber: '' });
  const [taxiLocation, setTaxiLocation] = useState(undefined);

  const initialScriptLoad = async () => {
    await loader.load();
    setApiLoaded(true);
  };

  useEffect(() => {
    initialScriptLoad();
  }, []);

  useEffect(() => {
    if (taxiData?.userMatchingSub) {
      setMatchState(true);
      setTaxiInfo(taxiData.userMatchingSub);
    }
  }, [taxiData]);

  useEffect(() => {
    if (taxiDataError && !taxiLatlngError) Toast.fail('택시 정보를 확인할 수 없습니다.');
  }, [taxiDataError]);

  useEffect(() => {
    if (taxiLatlng?.driverLocationSub) {
      setTaxiLocation(taxiLatlng);
    }
  }, [taxiLatlng]);

  useEffect(() => {
    if (taxiData && taxiLatlngError) Toast.fail('택시 위치를 확인할 수 없습니다.');
  }, [taxiLatlngError]);

  return (
    <>
      {apiLoaded && (
        <>
          <MapContainer isMatched={isMatched} taxiLocation={taxiLocation} />
          {isMatched && <MatchedDriverData taxiInfo={taxiInfo} />}
        </>
      )}
    </>
  );
};

export default UserMatchingPage;
