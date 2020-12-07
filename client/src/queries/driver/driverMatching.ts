import { gql } from '@apollo/client';

export const USER_ON_BOARD = gql`
  mutation userOnBoard($uid: String) {
    userOnBoard(uid: $uid) {
      success
      message
    }
  }
`;
