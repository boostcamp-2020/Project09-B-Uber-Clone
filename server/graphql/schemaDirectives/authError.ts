import { AuthenticationError } from 'apollo-server-express';
import { logger } from '../../config/winston';

export const authError = (): void => {
  logger.info('User login error!');
  throw new AuthenticationError('유효하지 않은 사용자입니다');
};
