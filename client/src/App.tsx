import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import client from './utils/apolloClient';
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
import { Provider } from 'react-redux';
import store from './stores';
import 'antd-mobile/lib/button/style/css';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/input-item/style/css';
import 'antd-mobile/lib/toast/style/css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={UserDriverSelectPage} />
            <Route exact path="/user" component={UserAuthPage} />
            <Route path="/user/signup" component={UserSignupPage} />
            <Route path="/user/signin" component={UserSigninPage} />
            <Route path="/user/map" component={UserMainPage} />
            <Route path="/user/matching" component={UserMatchingPage} />
            <Route exact path="/driver" component={DriverAuthPage} />
            <Route path="/driver/signup" component={DriverSignupPage} />
            <Route path="/driver/signin" component={DriverSigninPage} />
            <Route path="/driver/map" component={DriverMainPage} />
            <Route path="/driver/matching" component={DriverMatchingPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
