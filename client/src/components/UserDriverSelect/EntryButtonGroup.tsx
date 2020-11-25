import React from 'react';
import styled from 'styled-components';
import { Button, WhiteSpace } from 'antd-mobile';

const EntryButtonGroup: React.FC = () => {
  return (
    <Div>
      <Button
        type="primary"
        onClick={() => {
          location.href = '/user';
          return;
        }}
      >
        사용자로 시작하기
      </Button>
      <WhiteSpace />
      <br />
      <Button
        type="primary"
        onClick={() => {
          location.href = '/driver';
          return;
        }}
      >
        드라이버로 시작하기
      </Button>
    </Div>
  );
};

const Div = styled.div`
  width: 80%;
`;

export default EntryButtonGroup;
