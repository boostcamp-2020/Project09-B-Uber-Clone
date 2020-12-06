import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import client from '@utils/apolloClient';
import 'antd-mobile/lib/button/style/css';
import {
  UserDriverSelectPage,
  UserAuthPage,
  UserMainPage,
  UserMatchingPage,
  UserSigninPage,
  UserSignupPage,
  DriverAuthPage,
  DriverMainPage,
  DriverMatchingPage,
  DriverSigninPage,
  DriverSignupPage,
  NotFoundPage,
} from './pages';

import { AuthRouter, UserRouter, DriverRouter } from '@components/routers';

import { Provider } from 'react-redux';
import GoogleMapProvider from './contexts/GoogleMapProvider';
import store from './stores';

import 'antd-mobile/lib/button/style/css';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/input-item/style/css';
import 'antd-mobile/lib/toast/style/css';
import 'antd-mobile/lib/modal/style/css';
import 'antd-mobile/lib/activity-indicator/style/css';
import 'antd/lib/switch/style/css';
import 'antd/lib/progress/style/css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <GoogleMapProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={UserDriverSelectPage} />
              <AuthRouter exact path="/user" component={UserAuthPage} />
              <AuthRouter path="/user/signup" component={UserSignupPage} />
              <AuthRouter path="/user/signin" component={UserSigninPage} />
              <UserRouter path="/user/map" component={UserMainPage} />
              <UserRouter path="/user/matching" component={UserMatchingPage} />
              <AuthRouter exact path="/driver" component={DriverAuthPage} />
              <AuthRouter path="/driver/signup" component={DriverSignupPage} />
              <AuthRouter path="/driver/signin" component={DriverSigninPage} />
              <DriverRouter path="/driver/main" component={DriverMainPage} />
              <DriverRouter path="/driver/map" component={DriverMatchingPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </BrowserRouter>
        </GoogleMapProvider>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
