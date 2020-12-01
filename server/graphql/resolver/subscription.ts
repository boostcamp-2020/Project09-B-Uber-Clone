import { withFilter, AuthenticationError } from 'apollo-server-express';
import { REQUEST_ADDED, USER_MATCHED } from './subscriptionType';
import jwt from 'jsonwebtoken';
import Config from '../../config';

const subscription = {
  // userMatchingSub: async (_, { taxiId }, context) => {},
  // driverLocationSub: async (_, { taxiId }, context) => {},
  driverServiceSub: {
    subscribe: withFilter(
      (_, __, { pubsub }) => pubsub.asyncIterator([REQUEST_ADDED]),
      ({ possibleDrivers }, _, { cookies }) => {
        try {
          if (cookies) throw new Error();
          const { driverToken } = cookies;
          if (!driverToken) throw new Error();
          const { id } = jwt.verify(driverToken.trim(), Config.JWT_SECRET);
          if (!id) throw new Error();
          return possibleDrivers.some((driver) => driver._id.toString() === id);
        } catch (err) {
          throw new AuthenticationError('유효하지 않은 사용자입니다');
        }
      },
    ),
  },
};

export default subscription;