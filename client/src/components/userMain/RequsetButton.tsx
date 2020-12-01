import React from 'react';
import { Button, Toast } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PathPoint } from '@custom-types';
import { useMutation, gql } from '@apollo/client';

const MatchingReqBtn: React.FC = () => {
  const pathPoint = useSelector((state: { pathPoint: PathPoint }) => state.pathPoint);
  const history = useHistory();
  const [requestMatch] = useMutation(REQUEST_MATCH);

  const handlClick = async () => {
    const [result, message] = await registMatchingList();
    if (result) await history.push('/user/matching');
    else Toast.show(message, Toast.LONG);
  };

  const registMatchingList = async () => {
    if (!pathPoint.isSetStartPoint || !pathPoint.isSetEndPoint) return [false, '출발지와 도착지를 입력하세요'];
    const request = {
      startLocation: {
        name: pathPoint.startGeocode?.PointName,
        latlng: {
          ...pathPoint.startPoint,
        },
      },
      endLocation: {
        name: pathPoint.endGeocode?.PointName,
        latlng: {
          ...pathPoint.endPoint,
        },
      },
    };

    const result = false;
    const message = '';
    try {
      const {
        data: {
          requestMatching: { success: result, message: message },
        },
      } = await requestMatch({ variables: { request } });
      return [result, message];
    } catch (error) {
      console.error(error);
      return [result, message];
    }
  };

  return (
    <Button onClick={handlClick} type="primary" disabled={!pathPoint.isSetStartPoint || !pathPoint.isSetEndPoint}>
      택시자버 요청하기
    </Button>
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

export default MatchingReqBtn;
