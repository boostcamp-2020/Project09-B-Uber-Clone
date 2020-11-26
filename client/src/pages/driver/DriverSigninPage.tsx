import React from 'react';
import LoginForm from '@components/Signin/SigninForm';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const SIGNIN_DRIVER = gql`
  mutation DriverSignin($id: String!, $password: String!) {
    driverSignin(id: $id, password: $password) {
      success
      message
    }
  }
`;
const DriverSigninPage: React.FC = () => {
  const [signinDriver] = useMutation(SIGNIN_DRIVER);
  const history = useHistory();

  return <LoginForm signin={signinDriver} history={history} userType="driver" />;
};

export default DriverSigninPage;
