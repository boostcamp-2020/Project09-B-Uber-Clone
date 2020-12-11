import { gql } from '@apollo/client';

export const SIGNIN_DRIVER = gql`
  mutation DriverSignin($id: String!, $password: String!) {
    driverSignin(id: $id, password: $password) {
      success
      message
    }
  }
`;
