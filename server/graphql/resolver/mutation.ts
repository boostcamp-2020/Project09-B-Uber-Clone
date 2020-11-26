import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Config from '../../config';

const Mutation = {
  driverSignup: async (_, args, { dataSources, res }) => {
    const hashedPassword = await bcrypt.hash(args.password, Number(Config.BCRYPT_SALT_ROUNDS));

    const driverSchema = dataSources.model('Driver');
    const newDriver = new driverSchema({ ...args, password: hashedPassword });
    const result = await newDriver.save();

    if (!result) return { success: false, message: '회원가입 중 오류가 발생했습니다' };

    const token = jwt.sign({ id: result._id, isUser: false }, Config.JWT_SECRET);
    res.cookie('userToken', token, { signed: true });
    return { success: true };
  },
};

export default Mutation;
