import { logger } from '../../config/winston';

const Query = {
  isAuthorizedUser: () => true,
  isAuthorizedDriver: () => true,
  userHistory: async (_, { page }, { dataSources, uid }) => {
    const UserHistory = await dataSources.model('UserHistory');
    const userHistoryAll = await UserHistory.find({ user_id: uid });
    const [firstDataIdx, endDataIdx] = [(page - 1) * 10, page * 10];
    const userHistoryOnPage = userHistoryAll.slice(firstDataIdx, endDataIdx);
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
