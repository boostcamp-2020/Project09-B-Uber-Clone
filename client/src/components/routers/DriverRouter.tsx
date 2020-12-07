import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ActivityIndicator } from 'antd-mobile';
import styled from 'styled-components';
import { IS_DRIVER_AUTHORIZED } from '@queries/authQueries';

const DriverRouter: React.FC<any> = ({ component, ...rest }) => {
  const { loading, error, data } = useQuery(IS_DRIVER_AUTHORIZED);

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
