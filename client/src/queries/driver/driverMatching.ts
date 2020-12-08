import { gql } from '@apollo/client';

export const USER_ON_BOARD = gql`
  mutation UserOnBoard($uid: String) {
    userOnBoard(uid: $uid) {
      success
      message
    }
  }
`;


export const UPDATE_DRIVER_LOCATION = gql`
  mutation UpdateDriverLocation($location: LatLngInput, $uid: String) {
    updateDriverLocation(location: $location, uid: $uid) {
      success
      message
    }
  }
`;

export const ARRIVE_DESTINATION = gql`
  mutation ArriveDestination {
    arriveDestination {
      success
      message
    }
  }
`;
