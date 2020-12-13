import { gql } from '@apollo/client';

export const ADD_DRIVER = gql`
  mutation DriverSignup($info: DriverSignupInfo!) {
    driverSignup(info: $info) {
      success
      message
    }
  }
`;
