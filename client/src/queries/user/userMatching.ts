import { gql } from '@apollo/client';

export const REQUEST_MATCH = gql`
  mutation requestMatching($request: UserRequestInput) {
    requestMatching(request: $request) {
      success
      message
    }
  }
`;

export const STOP_MATCHING = gql`
  mutation {
    stopMatching {
      success
      message
    }
  }
`;

export const MATCHED_TAXI = gql`
  subscription {
    userMatchingSub {
      id
      name
      carModel
      carColor
      plateNumber
      location {
        lat
        lng
      }
    }
  }
`;

export const TAXI_LOCATION = gql`
  subscription($id: String) {
    driverLocationSub(taxiId: $id) {
      lat
      lng
      board
      arrive
    }
  }
`;
