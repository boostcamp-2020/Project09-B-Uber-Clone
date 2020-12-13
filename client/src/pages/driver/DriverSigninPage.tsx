import React from 'react';
import LoginForm from '@components/signin/SigninForm';
import { useMutation } from '@apollo/client';
import { SIGNIN_DRIVER } from '@queries/driver/driverSignin';

const DriverSigninPage: React.FC = () => {
  const [signinDriver] = useMutation(SIGNIN_DRIVER);
  return <LoginForm signin={signinDriver} userType="driver" />;
};

export default DriverSigninPage;
