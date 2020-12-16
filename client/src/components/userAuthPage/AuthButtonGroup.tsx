import React from 'react';
import { Button } from 'antd-mobile';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props {
  userType: string;
}

const AuthButtonGroup: React.FC<RouteComponentProps & Props> = ({ history, userType }) => {
  return (
    <div style={{ width: '80%' }}>
      <Button type="primary" onClick={() => history.push(`/${userType}/signup`)}>
        회원가입
      </Button>
      <br />
      <Button type="primary" onClick={() => history.push(`/${userType}/signin`)}>
        로그인
      </Button>
    </div>
  );
};

export default withRouter(AuthButtonGroup);
