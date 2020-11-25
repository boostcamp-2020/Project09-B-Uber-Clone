const Mutation = {
  driverSignup: async (_, args, { dataSources, res }) => {
    const driverSchema = dataSources.model('Driver');
    const newDriver = new driverSchema(args);
    const result = await newDriver.save();

    if (!result) return { success: false, message: '회원가입 중 오류가 발생했습니다' };

    // TODO: 토큰 생성
    res.cookie('userToken', 'CREATED_TOKEN', { signed: true });
    return { success: true };
  },
};

export default Mutation;
