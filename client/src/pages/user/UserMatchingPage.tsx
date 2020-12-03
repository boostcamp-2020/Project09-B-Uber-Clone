import React, { useState, useEffect } from 'react';
import { gql, useSubscription } from '@apollo/client';
import { Loader } from '@googlemaps/js-api-loader';
import MatchedDriverData from '@components/UserMatching/MatchedDriverData';
import MapContainer from '../../containers/MapContainer';
import { Toast } from 'antd-mobile';
import Matching from '@components/userMatching/Matching';
import { gql, useSubscription, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import { useSelector } from 'react-redux';
import { PathPoint } from '@custom-types';

const MAX_REQUEST_COUNT = 6;
const MATCHING_INTERVAL = 10000;

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
  const pathPoint = useSelector((state: { pathPoint: PathPoint }) => state.pathPoint);
  const [requestCount, setRequestCount] = useState(MAX_REQUEST_COUNT);
  const history = useHistory();
  const [requestMatch] = useMutation(REQUEST_MATCH);
  const { data: taxiData, error: taxiDataError } = useSubscription(MATCHED_TAXI);
  const { data: taxiLatlng, error: taxiLatlngError } = useSubscription(TAXI_LOCATION);
  const [isMatched, setMatchState] = useState(false);
  const [taxiInfo, setTaxiInfo] = useState({ id: '', name: '', carModel: '', carColor: '', plateNumber: '' });
  const [taxiLocation, setTaxiLocation] = useState(undefined);
  const [googleMapApi, setGoogleMapApi]: any = useState({ loaded: false, directionRenderer: null });

  const initialScriptLoad = async () => {
    await loader.load();
    setGoogleMapApi({ loaded: true, directionRenderer: new google.maps.DirectionsRenderer() });
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

  useEffect(() => {
    const countdown = setInterval(async () => {
      await registMatchingList();
      setRequestCount(requestCount - 1);
    }, MATCHING_INTERVAL);
    return () => {
      clearInterval(countdown);
      if (requestCount === 0) {
        history.push('/user/map');
        Toast.show('매칭할 수 있는 드라이버가 없습니다.', Toast.LONG);
      }
    };
  }, [requestCount]);

  const registMatchingList = async () => {
    const request = {
      startLocation: {
        name: pathPoint.startPointName,
        latlng: {
          ...pathPoint.startPoint,
        },
      },
      endLocation: {
        name: pathPoint.startPointName,
        latlng: {
          ...pathPoint.endPoint,
        },
      },
    };

    try {
      const {
        data: {
          requestMatching: { success, message },
        },
      } = await requestMatch({ variables: { request } });
      return [success, message];
    } catch (error) {
      console.error(error);
      return [false, '알 수 없는 오류가 발생했습니다.'];
    }
  };

  const subscription = () => {
    const { loading, error, data } = useSubscription(MATCHING_SUBSCRIPTION);
    if (loading) return <Matching />;
    if (error) {
      Toast.show('알 수 없는 오류가 발생했습니다.');
      history.push('/user/map');
      return;
    }
    console.log(data);
    return <p>매칭 성공</p>;
  };

  return (
    <>
      {googleMapApi.loaded && (
        <>
          <Matching />
          <MapContainer
            isMatched={isMatched}
            taxiLocation={taxiLocation}
            directionRenderer={googleMapApi.directionRenderer}
          />
          {isMatched && <MatchedDriverData taxiInfo={taxiInfo} />}
        </>
      )}
    </>
  );
};

const REQUEST_MATCH = gql`
  mutation requestMatching($request: UserRequestInput) {
    requestMatching(request: $request) {
      success
      message
    }
  }
`;

const MATCHING_SUBSCRIPTION = gql`
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

export default UserMatchingPage;
