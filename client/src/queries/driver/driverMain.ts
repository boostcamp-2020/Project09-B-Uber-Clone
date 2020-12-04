import { gql } from '@apollo/client';

export const NEW_REQUEST = gql`
  subscription {
    driverServiceSub {
      uid
      expirationTime
      request {
        startLocation {
          name
          latlng {
            lat
            lng
          }
        }
        endLocation {
          name
          latlng {
            lat
            lng
          }
        }
      }
    }
  }
`;

export const ACCEPT_REQUEST = gql`
  mutation ApproveMatching($uid: String) {
    approveMatching(uid: $uid) {
      success
      message
    }
  }
`;

export const START_SERVICE = gql`
  mutation {
    startService {
      success
      message
    }
  }
`;

export const STOP_SERVICE = gql`
  mutation {
    stopService {
      success
      message
    }
  }
`;
export const UPDATE_LOCATION = gql`
  mutation UpdateDriverLocation($location: LatLngInput) {
    updateDriverLocation(location: $location) {
      success
      message
    }
  }
`;
