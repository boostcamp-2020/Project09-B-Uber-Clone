import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import Config from '../../config';
import { authError } from './authError';
import { logger } from '../../config/winston';

export const driverResolve = (originalResolve): any => {
  return async (...args) => {
    const { req, dataSources } = args[2];

    try {
      const cookie = req.signedCookies.userToken;
      if (!cookie) authError();

      const { id, isUser } = jwt.verify(cookie, Config.JWT_SECRET);
      console.log(isUser);

      if (!id || !isUser) authError();

      const driverSchema = dataSources.model('Driver');
      const user = await driverSchema.findById(id);
      if (!user) authError();

      return originalResolve.apply(this, args);
    } catch (err) {
      if (err instanceof AuthenticationError) throw err;
      logger.info('Server Error');
      throw new Error('오류가 발생했습니다');
    }
  };
};
