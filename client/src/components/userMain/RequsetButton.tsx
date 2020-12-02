import React from 'react';
import { Button, Toast } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PathPoint } from '@custom-types';

const MatchingReqBtn: React.FC = () => {
  const history = useHistory();
  const pathPoint = useSelector((state: { pathPoint: PathPoint }) => state.pathPoint);

  const handlClick = async () => {
    // const [result, message] = await registMatchingList();
    // if (result) await history.push('/user/matching');
    // else Toast.show(message, Toast.LONG);
    if (!pathPoint.isSetStartPoint || !pathPoint.isSetEndPoint) return;
    history.push('/user/matching');
  };

  return (
    <Button onClick={handlClick} type="primary" disabled={!pathPoint.isSetStartPoint || !pathPoint.isSetEndPoint}>
      택시자버 요청하기
    </Button>
  );
};

export default MatchingReqBtn;
