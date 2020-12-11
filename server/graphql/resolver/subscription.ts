import { withFilter } from 'apollo-server-express';
import { REQUEST_ADDED, USER_MATCHED, USER_ON_BOARD, UPDATE_LOCATION, ARRIVE_DESTINATION } from './subscriptionType';

const subscription = {
  userMatchingSub: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator([USER_MATCHED]),
      ({ uid }, _, { userId }) => {
        return uid === userId;
      },
    ),
  },
  driverLocationSub: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator([USER_ON_BOARD, UPDATE_LOCATION, ARRIVE_DESTINATION]),
      ({ uid }, _, { userId }) => {
        return uid === userId;
      },
    ),
  },
  driverServiceSub: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator([REQUEST_ADDED]),
      ({ possibleDrivers }, _, { driverId }) => {
        return possibleDrivers.some(({ driver }) => driver.toString() === driverId);
      },
    ),
  },
};

export default subscription;
