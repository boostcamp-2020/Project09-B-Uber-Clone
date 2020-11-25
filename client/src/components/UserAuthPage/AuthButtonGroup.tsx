import React from 'react';
import styled from 'styled-components';
import { Button, WhiteSpace } from 'antd-mobile';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const AuthButtonGroup: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <Div>
      <Button
        type="primary"
        onClick={() => {
          history.push('/user/signup');
          return;
        }}
      >
        회원가입
      </Button>
      <WhiteSpace />
      <br />
      <Button
        type="primary"
        onClick={() => {
          history.push('/user/signin');
          return;
        }}
      >
        로그인
      </Button>
    </Div>
  );
};

const Div = styled.div`
  width: 80%;
`;

export default withRouter(AuthButtonGroup);
