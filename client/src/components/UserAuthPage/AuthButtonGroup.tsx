import React from 'react';
import styled from 'styled-components';
import { Button, WhiteSpace } from 'antd-mobile';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props {
  who: string;
}

const AuthButtonGroup: React.FC<RouteComponentProps & Props> = ({ history, who }) => {
  return (
    <Div>
      <Button
        type="primary"
        onClick={() => {
          history.push(`/${who}/signup`);
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
          history.push(`/${who}/signin`);
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
