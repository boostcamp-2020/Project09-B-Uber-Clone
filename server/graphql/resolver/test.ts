export default {
  Mutation: {
    test: async (_, { text }, { dataSources }) => {
      const userSchema = dataSources.model('User');
      const newUser = new userSchema({ id: '1', password: text, phone: '111', name: 'test' });
      const result = await newUser.save();
      return !!result;
    },
  },
};
