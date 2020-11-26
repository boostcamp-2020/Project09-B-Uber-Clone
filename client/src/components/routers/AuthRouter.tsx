import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthRouter: React.FC<any> = ({ component, ...rest }) => {
  const isDriver = rest.path.startsWith('/driver');
  const hasCookie = isDriver ? !!Cookies.get('driverToken') : !!Cookies.get('userToken');

  return hasCookie ? (
    <Redirect to={`/${isDriver ? 'driver' : 'user'}/map`} />
  ) : (
    <Route {...rest} render={(props) => React.createElement(component, props)} />
  );
};

export default AuthRouter;
