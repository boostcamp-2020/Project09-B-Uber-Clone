import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import Config from '../../config';
import { authError } from './authError';
import { logger } from '../../config/winston';

export const driverResolve = (originalResolve): any => {
  return async (...args) => {
    const { req, dataSources } = args[2];

    try {
      const cookie = req.signedCookies.driverToken;
      if (!cookie) authError();

      const { id } = jwt.verify(cookie, Config.JWT_SECRET);
      if (!id) authError();

      const driverSchema = dataSources.model('Driver');
      const driver = await driverSchema.findById(id);
      if (!driver) authError();

      return originalResolve.apply(this, args);
    } catch (err) {
      if (err instanceof AuthenticationError) throw err;
      logger.info('Server Error');
      throw new Error('오류가 발생했습니다');
    }
  };
};
