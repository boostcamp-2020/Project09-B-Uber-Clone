import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import { ActivityIndicator } from 'antd-mobile';
import styled from 'styled-components';

const IS_USER_AUTHORIZED = gql`
  query IsUserAuthorized {
    isAuthorizedUser
  }
`;

const UserRouter: React.FC<any> = ({ component, ...rest }) => {
  const hasCookie = Cookies.get('userToken');
  const { loading, error, data } = useQuery(IS_USER_AUTHORIZED);

  useEffect(() => {
    if (error) Cookies.remove('userToken');
  }, [error]);

  if (!hasCookie) return <Redirect to={'/user'} />;
  if (loading)
    return (
      <Wrapper>
        <ActivityIndicator animating text="로딩 중입니다" />
      </Wrapper>
    );
  if (error || (!loading && !data.isAuthorizedUser)) return <Redirect to={'/user'} />;
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

export default UserRouter;
