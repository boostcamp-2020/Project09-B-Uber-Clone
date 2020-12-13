import { gql } from '@apollo/client';

export const SIGNIN_USER = gql`
  mutation UserSignin($info: SigninInfo!) {
    userSignin(info: $info) {
      success
      message
    }
  }
`;
