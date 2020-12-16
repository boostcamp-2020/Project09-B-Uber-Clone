import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation UserSignup($info: UserSignupInfo!) {
    userSignup(info: $info) {
      success
      message
    }
  }
`;
