import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Config from '../../config';
import { logger } from '../../config/winston';

const Mutation = {
  driverSignup: async (_, args, { dataSources, res }) => {
    const hashedPassword = await bcrypt.hash(args.password, Number(Config.BCRYPT_SALT_ROUNDS));
    const driverSchema = dataSources.model('Driver');

    const driver = await driverSchema.findOne({ id: args.id });
    if (driver) return { success: false, message: '중복된 아이디입니다. 다른 아이디로 가입해주세요.' };

    const newDriver = new driverSchema({ ...args, password: hashedPassword });
    const result = await newDriver.save();
    if (!result) return { success: false, message: '회원가입 중 오류가 발생했습니다' };

    const token = jwt.sign({ id: result._id }, Config.JWT_SECRET);
    res.cookie('driverToken', token, { signed: true });
    return { success: true };
  },
  userSignin: async (_, args, { dataSources, res }) => {
    try {
      const userSchema = dataSources.model('User');
      const user = await userSchema.findOne({ id: args.id });
      if (user) {
        if (await bcrypt.compareSync(args.password, user.password)) {
          const token = jwt.sign({ id: user._id }, Config.JWT_SECRET);
          res.cookie('userToken', token, { httpOnly: true, signed: true });
          logger.info(`${args.id} user logined!`);
          return { success: true };
        }
        return { success: false, message: '잘못된 비밀번호입니다.' };
      }
      return { success: false, message: '존재하지 않는 아이디입니다.' };
    } catch (err) {
      logger.info('User login error!');
      return { status: false, message: '유효하지 않은 접근입니다.' };
    }
  },
  driverSignin: async (_, args, { dataSources, res }) => {
    try {
      const driverSchema = dataSources.model('Driver');
      const driver = await driverSchema.findOne({ id: args.id });
      if (driver) {
        if (await bcrypt.compareSync(args.password, driver.password)) {
          const token = jwt.sign({ id: driver._id }, Config.JWT_SECRET);
          res.cookie('driverToken', token, { httpOnly: true, signed: true });
          logger.info(`${args.id} driver logined!`);
          return { success: true };
        }
        return { success: false, message: '잘못된 비밀번호입니다.' };
      }
      return { success: false, message: '존재하지 않는 아이디입니다.' };
    } catch (err) {
      logger.info('Driver login error!');
      return { success: false, message: '유효하지 않은 접근입니다.' };
    }
  },
};

export default Mutation;
