import { gql } from '@apollo/client';

export const SIGNIN_DRIVER = gql`
  mutation DriverSignin($info: SigninInfo!) {
    driverSignin(info: $info) {
      success
      message
    }
  }
`;
