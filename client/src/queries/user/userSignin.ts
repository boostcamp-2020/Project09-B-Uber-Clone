import { gql } from '@apollo/client';

export const SIGNIN_USER = gql`
  mutation UserSignin($id: String!, $password: String!) {
    userSignin(id: $id, password: $password) {
      success
      message
    }
  }
`;
