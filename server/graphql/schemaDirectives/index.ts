import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import jwt from 'jsonwebtoken';
import Config from '../../config';
import { authError } from './authError';
import { logger } from '../../config/winston';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field): any {
    const requiredRole = this.args.requires;
    const originalResolve = field.resolve || defaultFieldResolver;
    const isDriverAuth = requiredRole === 'DRIVER';

    field.resolve = async (...args) => {
      const { req, res, dataSources } = args[2];
      try {
        const cookie = isDriverAuth ? req.signedCookies.driverToken : req.signedCookies.userToken;
        if (!cookie) authError();

        const { id } = jwt.verify(cookie, Config.JWT_SECRET);
        if (!id) authError();

        const modelName = isDriverAuth ? 'Driver' : 'User';
        const requestSchema = dataSources.model(modelName);
        const result = await requestSchema.findById(id);
        if (!result) authError();

        return originalResolve.apply(this, args);
      } catch (err) {
        if (err instanceof AuthenticationError) {
          if (isDriverAuth) res.clearCookie('driverToken');
          else res.clearCookie('userToken');
          throw err;
        }
        logger.info('Server Error');
        throw new Error('오류가 발생했습니다');
      }
    };
  }
}

export default AuthDirective;
