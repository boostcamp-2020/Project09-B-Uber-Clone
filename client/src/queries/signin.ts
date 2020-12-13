import { gql } from '@apollo/client';

export const SIGNIN = gql`
  mutation Signin($info: SigninInfo!) {
    signin(info: $info) {
      success
      message
    }
  }
`;
