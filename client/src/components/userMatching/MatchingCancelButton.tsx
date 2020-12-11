import React from 'react';
import { Button } from 'antd-mobile';

const MatchingCancelButton: React.FC<{ onClickHandler: () => void }> = ({ onClickHandler }) => {
  return (
    <Button type={'primary'} onClick={onClickHandler} style={{ width: '90%' }}>
      호출 취소하기
    </Button>
  );
};

export default MatchingCancelButton;
