import React from 'react';
import { Button } from 'antd-mobile';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const EntryButtonGroup: React.FC<RouteComponentProps> = ({ history }) => {
  const buttonStyle = { boxShadow: 'rgb(134 134 134 / 60%) 3px 6px 20px' };
  return (
    <div style={{ width: '80%' }}>
      <Button type="primary" onClick={() => history.push('/user')} style={buttonStyle}>
        사용자로 시작하기
      </Button>
      <br />
      <Button type="primary" onClick={() => history.push('/driver')} style={buttonStyle}>
        드라이버로 시작하기
      </Button>
    </div>
  );
};

export default withRouter(EntryButtonGroup);
