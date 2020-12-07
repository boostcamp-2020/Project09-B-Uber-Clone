import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { ActivityIndicator } from 'antd-mobile';
import { IS_DRIVER_AUTHORIZED, IS_USER_AUTHORIZED } from '@queries/authQueries';

const AuthRouter: React.FC<any> = ({ component, ...rest }) => {
  const isDriver = rest.path.startsWith('/driver');
  const { loading, error, data } = useQuery(isDriver ? IS_DRIVER_AUTHORIZED : IS_USER_AUTHORIZED);

  if (loading)
    return (
      <Wrapper>
        <ActivityIndicator animating text="로딩 중입니다" />
      </Wrapper>
    );
  if (error || !(isDriver ? data.isAuthorizedDriver : data.isAuthorizedUser))
    return <Route {...rest} render={(props) => React.createElement(component, props)} />;
  return <Redirect to={isDriver ? '/driver/main' : '/user/map'} />;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export default AuthRouter;
