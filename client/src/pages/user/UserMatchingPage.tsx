import React, { useEffect, useState } from 'react';
import MapContainer from 'src/containers/MapContainer';
import Matching from '@components/userMatching/Matching';
import { gql, useSubscription, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Toast } from 'antd-mobile';
import { useSelector } from 'react-redux';
import { PathPoint } from '@custom-types';

const MAX_REQUEST_COUNT = 6;
const MATCHING_INTERVAL = 10000;

const UserMatchingPage: React.FC = () => {
  const pathPoint = useSelector((state: { pathPoint: PathPoint }) => state.pathPoint);
  const [requestCount, setRequestCount] = useState(MAX_REQUEST_COUNT - 1);
  const history = useHistory();
  const [requestMatch] = useMutation(REQUEST_MATCH);
  const { loading, error, data } = useSubscription(MATCHING_SUBSCRIPTION);

  useEffect(() => {
    const timer = setInterval(async () => {
      await registMatchingList();
      setRequestCount(requestCount - 1);
    }, MATCHING_INTERVAL);
    if (!loading) clearInterval(timer);
    return () => {
      clearInterval(timer);
      if (requestCount === 0) {
        history.push('/user/map');
        Toast.show('매칭할 수 있는 드라이버가 없습니다.', Toast.SHORT);
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

  useEffect(() => {
    if (error) onErrorHandler();
  }, [error]);

  const onErrorHandler = () => {
    console.log('???');
    console.log('test', error);
    Toast.show('알 수 없는 오류가 발생했습니다.', Toast.SHORT);
    history.push('/user/map');
  };

  const onMatchSuccess = () => {
    return <p>매칭성공</p>;
  };

  return (
    <>
      {loading && <Matching />}
      {data && onMatchSuccess()}
      <MapContainer />
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
