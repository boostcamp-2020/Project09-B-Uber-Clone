import authMutation from './mutations/auth';
import userMutation from './mutations/user';
import driverMutation from './mutations/driver';

const Mutation = {
  ...authMutation,
  ...userMutation,
  ...driverMutation,
};

export default Mutation;
