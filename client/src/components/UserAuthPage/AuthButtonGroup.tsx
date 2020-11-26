import React from 'react';
import styled from 'styled-components';
import { Button, WhiteSpace } from 'antd-mobile';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props {
  userType: string;
}

const AuthButtonGroup: React.FC<RouteComponentProps & Props> = ({ history, userType }) => {
  return (
    <Div>
      <Button
        type="primary"
        onClick={() => {
          history.push(`/${userType}/signup`);
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
          history.push(`/${userType}/signin`);
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
