import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import { ActivityIndicator } from 'antd-mobile';
import styled from 'styled-components';

const IS_DRIVER_AUTHORIZED = gql`
  query IsDriverAuthorized {
    isAuthorizedDriver
  }
`;

const DriverRouter: React.FC<any> = ({ component, ...rest }) => {
  const hasCookie = Cookies.get('driverToken');
  const { loading, error, data } = useQuery(IS_DRIVER_AUTHORIZED);

  useEffect(() => {
    if (error) Cookies.remove('driverToken');
  }, [error]);

  if (!hasCookie) return <Redirect to={'/driver'} />;
  if (loading)
    return (
      <Wrapper>
        <ActivityIndicator animating text="로딩 중입니다" />
      </Wrapper>
    );
  if (error || (!loading && !data.isAuthorizedDriver)) return <Redirect to={'/driver'} />;
  return <Route {...rest} render={(props) => React.createElement(component, props)} />;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export default DriverRouter;
