import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { logger } from '../../../config/winston';
import Config from '../../../config';

const DUPLICATION_ERROR = { success: false, message: '중복된 아이디입니다. 다른 아이디로 가입해주세요.' };
const SIGNUP_ERROR = { success: false, message: '회원가입 중 오류가 발생했습니다' };
const WRONG_ID = { success: false, message: '존재하지 않는 아이디입니다.' };
const WRONG_PASSWORD = { success: false, message: '잘못된 비밀번호입니다.' };
const WRONG_ACCESS = { success: false, message: '유효하지 않은 접근입니다.' };

export default {
  userSignup: async (_, { info }, { dataSources, res }) => {
    const { id, password } = info;
    try {
      const hashedPassword = await bcrypt.hash(password, Number(Config.BCRYPT_SALT_ROUNDS));
      const userSchema = dataSources.model('User');
      const user = await userSchema.findOne({ id });
      if (user) return DUPLICATION_ERROR;
      const newUser = new userSchema({ ...info, password: hashedPassword });
      const result = await newUser.save();

      if (!result) return SIGNUP_ERROR;
      const token = jwt.sign({ id: result._id }, Config.JWT_SECRET);
      res.cookie('userToken', token, { signed: true, httpOnly: true });
      return { success: true };
    } catch (err) {
      logger.error(`USER SIGNUP ERROR: ${err}`);
      return SIGNUP_ERROR;
    }
  },
  driverSignup: async (_, { info }, { dataSources, res }) => {
    try {
      const driverSchema = dataSources.model('Driver');
      const driver = await driverSchema.findOne({ id: info.id });
      if (driver) return DUPLICATION_ERROR;

      const hashedPassword = await bcrypt.hash(info.password, Number(Config.BCRYPT_SALT_ROUNDS));
      const newDriver = new driverSchema({ ...info, password: hashedPassword });
      const result = await newDriver.save();
      if (!result) SIGNUP_ERROR;

      const token = jwt.sign({ id: result._id }, Config.JWT_SECRET);
      res.cookie('driverToken', token, { signed: true, httpOnly: true });
      return { success: true };
    } catch (err) {
      logger.error(`DRIVER SIGNUP ERROR: ${err}`);
      return SIGNUP_ERROR;
    }
  },
  signin: async (_, { info }, { dataSources, res }) => {
    try {
      const schema = info.type === 'user' ? dataSources.model('User') : dataSources.model('Driver');
      const result = await schema.findOne({ id: info.id });
      if (result) {
        if (await bcrypt.compare(info.password, result.password)) {
          const token = jwt.sign({ id: result._id }, Config.JWT_SECRET);
          res.cookie(`${info.type}Token`, token, { httpOnly: true, signed: true });
          logger.info(`${info.id} ${info.type} logined!`);
          return { success: true };
        }
        return WRONG_PASSWORD;
      }
      return WRONG_ID;
    } catch (err) {
      logger.info('Driver login error!');
      return WRONG_ACCESS;
    }
  },
  signout: async (_, { type }, { dataSources, req, res }) => {
    try {
      if (type === 'driver') {
        const id = jwt.verify(req.signedCookies.driverToken, Config.JWT_SECRET).id;
        const waitingDriver = await dataSources.model('WaitingDriver');
        await waitingDriver.findOneAndRemove({ driver: id });
      }
      const result = res.clearCookie(`${type}Token`);
      if (result) return { success: true };
      return WRONG_ACCESS;
    } catch (err) {
      logger.error('Logout error!');
      return WRONG_ACCESS;
    }
  },
};
