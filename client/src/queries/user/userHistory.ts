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
      carModel
      plateNumber
    }
  }
`;
