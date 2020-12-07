const Query = {
  isAuthorizedUser: () => true,
  isAuthorizedDriver: () => true,
  userHistory: async (_, { page }, { dataSources, uid }) => {
    // TODO: history 조회 결과 return
  },
};

export default Query;
