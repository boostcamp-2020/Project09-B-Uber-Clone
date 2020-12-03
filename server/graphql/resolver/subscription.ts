import { withFilter } from 'apollo-server-express';
import { REQUEST_ADDED, USER_MATCHED } from './subscriptionType';

const subscription = {
  userMatchingSub: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator([USER_MATCHED]),
      ({ uid }, _, { userId }) => {
        return uid === userId;
      },
    ),
  },
  // driverLocationSub: async (_, { taxiId }, context) => {},
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
