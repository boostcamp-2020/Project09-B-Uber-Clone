import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd-mobile';

const DriverWorkingContent = () => {
  const onAccept = () => {
    console.log(1);
  };

  const onReject = () => {
    console.log(2);
  };

  return (
    <>
      <div>콜 대기중</div>
      <ButtonGroup>
        <Button type="primary" onClick={onAccept}>
          수락하기
        </Button>
        <Button onClick={onReject} style={{ backgroundColor: 'rgba(120,120,120,0.4)' }}>
          거절하기
        </Button>
      </ButtonGroup>
    </>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > a {
    width: 45%;
  }
`;

export default DriverWorkingContent;
