import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation UserSignup($id: String!, $password: String!, $name: String!, $phone: String!) {
    userSignup(id: $id, password: $password, name: $name, phone: $phone) {
      success
      message
    }
  }
`;
