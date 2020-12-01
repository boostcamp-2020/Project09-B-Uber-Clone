import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { verifyUserByCookie } from '../../utils/verifyUserByCookie';
import { authError } from './authError';
import { logger } from '../../config/winston';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field): any {
    const requiredRole = this.args.requires;
    const originalResolve = field.resolve || defaultFieldResolver;
    const isDriverAuth = requiredRole === 'DRIVER';

    field.resolve = async (...args) => {
      const { req, res, dataSources, isConnection, cookies } = args[2];
      try {
        const cookie = isDriverAuth
          ? isConnection
            ? cookies.driverToken
            : req.signedCookies.driverToken
          : isConnection
          ? cookies.userToken
          : req.signedCookies.userToken;
        if (!cookie) authError();

        const modelName = isDriverAuth ? 'Driver' : 'User';
        const requestSchema = dataSources.model(modelName);
        const id = await verifyUserByCookie(cookie, requestSchema);

        args[2] = { ...args[2], uid: id };
        return originalResolve.apply(this, args);
      } catch (err) {
        if (err instanceof AuthenticationError) {
          if (isConnection) throw err;
          if (isDriverAuth) res.clearCookie('driverToken');
          else res.clearCookie('userToken');
          throw err;
        }
        logger.error(`Internal Server Error: ${err}`);
        throw new Error('오류가 발생했습니다');
      }
    };
  }
}

export default AuthDirective;
