import React, { useCallback } from 'react';
import { Button, Toast } from 'antd-mobile';

const MatchingCancelButton: React.FC<{ cancelMatching: () => Promise<void> }> = ({ cancelMatching }) => {
  const onClickHandler = useCallback(async () => {
    await cancelMatching();
    Toast.show('호출을 취소했습니다.', Toast.SHORT);
  }, []);

  return (
    <Button type={'primary'} onClick={onClickHandler} style={{ width: '90%' }}>
      호출 취소하기
    </Button>
  );
};

export default MatchingCancelButton;
