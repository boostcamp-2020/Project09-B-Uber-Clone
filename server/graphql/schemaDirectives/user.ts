import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import Config from '../../config';
import { authError } from './authError';
import { logger } from '../../config/winston';

export const userResolve = (originalResolve): any => {
  return async (...args) => {
    const { req, dataSources } = args[2];

    try {
      const cookie = req.signedCookies.userToken;
      if (!cookie) authError();

      const { id, isUser } = jwt.verify(cookie, Config.JWT_SECRET);
      if (!id || !isUser) authError();

      const userSchema = dataSources.model('User');
      const user = await userSchema.findById(id);
      if (!user) authError();

      return originalResolve.apply(this, args);
    } catch (err) {
      if (err instanceof AuthenticationError) throw err;
      logger.info('Server Error');
      throw new Error('오류가 발생했습니다');
    }
  };
};
