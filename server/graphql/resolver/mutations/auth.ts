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
  userSignup: async (_, args, { dataSources, res }) => {
    try {
      const hashedPassword = await bcrypt.hash(args.password, Number(Config.BCRYPT_SALT_ROUNDS));
      const userSchema = dataSources.model('User');
      const newUser = new userSchema({ ...args, password: hashedPassword });
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
  driverSignup: async (_, args, { dataSources, res }) => {
    try {
      const hashedPassword = await bcrypt.hash(args.password, Number(Config.BCRYPT_SALT_ROUNDS));
      const driverSchema = dataSources.model('Driver');
      const driver = await driverSchema.findOne({ id: args.id });
      if (driver) return DUPLICATION_ERROR;

      const newDriver = new driverSchema({ ...args, password: hashedPassword });
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
  userSignin: async (_, args, { dataSources, res }) => {
    try {
      const userSchema = dataSources.model('User');
      const user = await userSchema.findOne({ id: args.id });
      if (user) {
        if (await bcrypt.compare(args.password, user.password)) {
          const token = jwt.sign({ id: user._id }, Config.JWT_SECRET);
          res.cookie('userToken', token, { httpOnly: true, signed: true });
          logger.info(`${args.id} user logined!`);
          return { success: true };
        }
        return WRONG_PASSWORD;
      }
      return WRONG_ID;
    } catch (err) {
      logger.info('User login error!');
      return WRONG_ACCESS;
    }
  },
  driverSignin: async (_, args, { dataSources, res }) => {
    try {
      const driverSchema = dataSources.model('Driver');
      const driver = await driverSchema.findOne({ id: args.id });
      if (driver) {
        if (await bcrypt.compare(args.password, driver.password)) {
          const token = jwt.sign({ id: driver._id }, Config.JWT_SECRET);
          res.cookie('driverToken', token, { httpOnly: true, signed: true });
          logger.info(`${args.id} driver logined!`);
          return { success: true };
        }
        return WRONG_PASSWORD;
      }
      return WRONG_PASSWORD;
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
