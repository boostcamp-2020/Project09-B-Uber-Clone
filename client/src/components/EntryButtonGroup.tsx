import React from 'react';
import styled from 'styled-components';
import { Button, WhiteSpace } from 'antd-mobile';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const EntryButtonGroup: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <Div>
      <Button
        type="primary"
        onClick={() => {
          history.push('/user');
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
          history.push('/driver');
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

export default withRouter(EntryButtonGroup);
