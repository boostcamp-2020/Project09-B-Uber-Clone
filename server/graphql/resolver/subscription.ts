import { withFilter, AuthenticationError } from 'apollo-server-express';
import { REQUEST_ADDED, USER_MATCHED } from './subscriptionType';
import jwt from 'jsonwebtoken';
import Config from '../../config';
import { logger } from '../../config/winston';

const subscription = {
  userMatchingSub: {
    subscribe: (_, __, { pubsub }) => pubsub.asyncIterator([USER_MATCHED]),
  },
  // driverLocationSub: async (_, { taxiId }, context) => {},
  driverServiceSub: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator([REQUEST_ADDED]),
      ({ possibleDrivers }, _, { driverId }) => {
        return possibleDrivers.some((openDriver) => openDriver._id.toString() === driverId);
      },
    ),
  },
};

export default subscription;
