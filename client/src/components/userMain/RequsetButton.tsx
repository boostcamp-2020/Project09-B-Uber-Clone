import React, { useCallback } from 'react';
import { Button } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PathPoint } from '@custom-types';

const MatchingReqBtn: React.FC = () => {
  const history = useHistory();
  const pathPoint = useSelector((state: { pathPoint: PathPoint }) => state.pathPoint);

  const handlClick = useCallback(async () => {
    if (!pathPoint.isSetStartPoint || !pathPoint.isSetEndPoint) return;
    history.push('/user/matching');
  }, [pathPoint]);

  return (
    <Button onClick={handlClick} type="primary" disabled={!pathPoint.isSetStartPoint || !pathPoint.isSetEndPoint}>
      택시자버 요청하기
    </Button>
  );
};

export default MatchingReqBtn;
