import { gql } from '@apollo/client';

export const SIGNIN = gql`
  mutation Signin($type: String!, $id: String!, $password: String!) {
    signin(type: $type, id: $id, password: $password) {
      success
      message
    }
  }
`;
