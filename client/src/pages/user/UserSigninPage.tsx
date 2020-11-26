import React from 'react';
import LoginForm from '../../components/Signin/SigninForm';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const SIGNIN_USER = gql`
  mutation UserSignin($id: String!, $password: String!) {
    userSignin(id: $id, password: $password) {
      success
      message
    }
  }
`;

const UserSigninPage: React.FC = () => {
  const [signinUser] = useMutation(SIGNIN_USER);
  const history = useHistory();

  return <LoginForm signin={signinUser} history={history} />;
};

export default UserSigninPage;
