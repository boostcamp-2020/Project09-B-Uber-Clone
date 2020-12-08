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
  mutation saveUserHistory(
    $uid: String!
    $request: UserRequestInput!
    $fee: Int!
    $carModel: String!
    $plateNumber: String!
    $startTime: String!
    $endTime: String!
  ) {
    saveUserHistory(
      uid: $uid
      request: $request
      fee: $fee
      startTime: $startTime
      endTime: $endTime
      carModel: $carModel
      plateNumber: $plateNumber
    ) {
      success
      message
    }
  }
`;
