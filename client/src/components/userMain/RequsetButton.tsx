import React from 'react';
import { Button } from 'antd-mobile';
import { useHistory } from 'react-router-dom';

const MatchingReqBtn: React.FC = () => {
  const history = useHistory();
  const handlClick = async () => {
    history.push('/user/matching');
  };
  return (
    <Button onClick={handlClick} type="primary">
      택시자버 요청하기
    </Button>
  );
};

export default MatchingReqBtn;
