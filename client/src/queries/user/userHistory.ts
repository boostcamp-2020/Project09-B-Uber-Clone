import { gql } from '@apollo/client';

export const GET_USER_HISTORY = gql`
  query UserHistory($page: Int) {
    userHistory(page: $page) {
      id
      request {
        startLocation {
          name
        }
        endLocation {
          name
        }
      }
      fee
      startTime
      endTime
      carModel
      plateNumber
    }
  }
`;

export const SAVE_USER_HISTORY = gql`
  mutation saveUserHistory($info: HistoryInfo!) {
    saveUserHistory(info: $info) {
      success
      message
    }
  }
`;
