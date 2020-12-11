import { gql } from '@apollo/client';

export const SIGNOUT = gql`
  mutation Signout($type: String!) {
    signout(type: $type) {
      success
      message
    }
  }
`;
