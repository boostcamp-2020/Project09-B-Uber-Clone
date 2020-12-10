import React from 'react';
import LoginForm from '@components/signin/SigninForm';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { SIGNIN_USER } from '@queries/user/userSignin';

const UserSigninPage: React.FC = () => {
  const [signinUser] = useMutation(SIGNIN_USER);
  const history = useHistory();

  return <LoginForm signin={signinUser} history={history} userType="user" />;
};

export default UserSigninPage;
