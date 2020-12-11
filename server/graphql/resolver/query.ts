import { logger } from '../../config/winston';

const Query = {
  isAuthorizedUser: () => true,
  isAuthorizedDriver: () => true,
  userHistory: async (_, { page }, { dataSources, uid }) => {
    const UserHistory = await dataSources.model('UserHistory');
    const userHistoryOnPage = await UserHistory.find({ user_id: uid })
      .sort({ startTime: 'desc' })
      .skip((page - 1) * 10)
      .limit(10);
    return userHistoryOnPage;
  },
  isDriverWaiting: async (_, __, { dataSources, uid }) => {
    try {
      const waitingDriverSchema = dataSources.model('WaitingDriver');
      const waitingDriver = await waitingDriverSchema.find({ driver: uid });
      logger.info(`isDriverWaiting check ${!!waitingDriver.length}`);
      return waitingDriver.length;
    } catch (error) {
      logger.error(`isDriverWaiting ERROR: ${error}`);
      return false;
    }
  },
};
export default Query;
