import { gql } from '@apollo/client';

export const IS_DRIVER_AUTHORIZED = gql`
  query IsDriverAuthorized {
    isAuthorizedDriver
  }
`;
export const IS_USER_AUTHORIZED = gql`
  query IsUserAuthorized {
    isAuthorizedUser
  }
`;
