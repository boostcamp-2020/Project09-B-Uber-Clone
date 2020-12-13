import React from 'react';
import LoginForm from '@components/signin/SigninForm';
import { useMutation } from '@apollo/client';
import { SIGNIN_USER } from '@queries/user/userSignin';

const UserSigninPage: React.FC = () => {
  const [signinUser] = useMutation(SIGNIN_USER);
  return <LoginForm signin={signinUser} userType="user" />;
};

export default UserSigninPage;
