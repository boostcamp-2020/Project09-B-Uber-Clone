import React from 'react';
import LoginForm from '@components/signin/SigninForm';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { SIGNIN_DRIVER } from '@queries/driver/driverSignin';

const DriverSigninPage: React.FC = () => {
  const [signinDriver] = useMutation(SIGNIN_DRIVER);
  const history = useHistory();

  return <LoginForm signin={signinDriver} history={history} userType="driver" />;
};

export default DriverSigninPage;
