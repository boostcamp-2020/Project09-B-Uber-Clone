import { gql } from '@apollo/client';

export const MATCHED_TAXI = gql`
  subscription {
    userMatchingSub {
      id
      name
      carModel
      carColor
      plateNumber
    }
  }
`;

export const TAXI_LOCATION = gql`
  subscription($id: string) {
    driverLocationSub(taxiId: $id) {
      lat
      lng
    }
  }
`;

export const REQUEST_MATCH = gql`
  mutation requestMatching($request: UserRequestInput) {
    requestMatching(request: $request) {
      success
      message
    }
  }
`;

export const MATCHING_SUBSCRIPTION = gql`
  subscription {
    userMatchingSub {
      id
      name
      carModel
      carColor
      plateNumber
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
