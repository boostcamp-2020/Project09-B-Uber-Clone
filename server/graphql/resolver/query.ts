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
};
export default Query;
