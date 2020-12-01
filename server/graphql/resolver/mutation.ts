import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Config from '../../config';
import { logger } from '../../config/winston';
import { REQUEST_ADDED, USER_MATCHED } from './subscriptionType';

const Mutation = {
  userSignup: async (_, args, { dataSources, res }) => {
    const hashedPassword = await bcrypt.hash(args.password, Number(Config.BCRYPT_SALT_ROUNDS));

    const userSchema = dataSources.model('User');
    const newUser = new userSchema({ ...args, password: hashedPassword });
    const result = await newUser.save();

    if (!result) return { success: false, message: '회원가입 중 오류가 발생했습니다' };
    const token = jwt.sign({ id: result._id }, Config.JWT_SECRET);
    res.cookie('userToken', token, { signed: true, httpOnly: true });
    return { success: true };
  },
  driverSignup: async (_, args, { dataSources, res }) => {
    const hashedPassword = await bcrypt.hash(args.password, Number(Config.BCRYPT_SALT_ROUNDS));
    const driverSchema = dataSources.model('Driver');

    const driver = await driverSchema.findOne({ id: args.id });
    if (driver) return { success: false, message: '중복된 아이디입니다. 다른 아이디로 가입해주세요.' };

    const newDriver = new driverSchema({ ...args, password: hashedPassword });
    const result = await newDriver.save();
    if (!result) return { success: false, message: '회원가입 중 오류가 발생했습니다' };

    const token = jwt.sign({ id: result._id }, Config.JWT_SECRET);
    res.cookie('driverToken', token, { signed: true, httpOnly: true });
    return { success: true };
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
        return { success: false, message: '잘못된 비밀번호입니다.' };
      }
      return { success: false, message: '존재하지 않는 아이디입니다.' };
    } catch (err) {
      logger.info('User login error!');
      return { success: false, message: '유효하지 않은 접근입니다.' };
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
        return { success: false, message: '잘못된 비밀번호입니다.' };
      }
      return { success: false, message: '존재하지 않는 아이디입니다.' };
    } catch (err) {
      logger.info('Driver login error!');
      return { success: false, message: '유효하지 않은 접근입니다.' };
    }
  },
  requestMatching: async (_, { request }, { dataSources, uid, pubsub }) => {
    try {
      const requestingUserSchema = dataSources.model('RequestingUser');
      const newRequest = new requestingUserSchema({ ...request, user_id: uid });
      const result = await newRequest.save();
      const startLocationLatLng = request.startLocation.latlng;
      const area = {
        center: [startLocationLatLng.lat, startLocationLatLng.lng],
        radius: 3000,
        unique: true,
      };

      /**
       * TODO: WaitingDriver 반영 시 possibleDrivers 변경
       * const waitingDriverSchema = dataSources.model('WaitingDriver');
       * const possibleDrivers = await waitingDriverSchema.where('location').within().circle(area);
       */
      const waitingDriverSchema = dataSources.model('Driver');
      const possibleDrivers = await waitingDriverSchema.find({});
      await pubsub.publish(REQUEST_ADDED, {
        possibleDrivers,
        driverServiceSub: { uid, request, requestTime: new Date() }, // requestTime을 DB에 insert할 때로 변경
      });

      if (result) {
        logger.info(`Driver matched: ${possibleDrivers}`);
        return { success: true };
      }
      logger.error('DATABASE ERROR');
      return { success: false, message: 'Database error' };
    } catch (err) {
      logger.error(`REQUEST MATCHING ERROR : ${err}`);
      return { success: false, message: 'Internal server error' };
    }
  },
  stopMatching: async (_, __, { dataSources, uid }) => {
    try {
      const requiestingUserSchema = dataSources.model('RequestingUser');
      const result = await requiestingUserSchema.find({ user_id: uid }).remove().exec();
      if (result) {
        logger.info(`${uid} user matching stop!`);
        return { success: true };
      }
      logger.error(`STOP MATCHING ERROR : 해당 요청이 존재하지 않습니다.`);
      return { success: false, message: '해당 요청이 존재하지 않습니다.' };
    } catch (err) {
      logger.error(`STOP MATCHING ERROR : ${err}`);
      return { success: false, message: '알 수 없는 오류가 발생했습니다.' };
    }
  },
  startService: async (_, __, { dataSources, uid }) => {
    try {
      const waitingDriver = await dataSources.model('WaitingDriver');
      const existingWaitingDriver = await waitingDriver.findOne({ driver: uid });
      if (existingWaitingDriver) return { success: true };
      const newWaitingDriver = new waitingDriver({ driver: uid });
      const result = await newWaitingDriver.save();

      logger.info(`${uid} start service: ${result}`);
      if (result) return { success: true };
      return { success: false, message: '영업을 시작 할 수 없습니다.' };
    } catch (err) {
      logger.error(`START SERVICE ERROR : ${err}`);
      return { success: false, message: '영업을 시작 할 수 없습니다' };
    }
  },
  stopService: async (_, __, { dataSources, uid }) => {
    try {
      const waitingDriver = await dataSources.model('WaitingDriver');
      const result = await waitingDriver.findOneAndRemove({ driver: uid });
      logger.info(`${uid} stop service: ${result}`);
      if (result) return { success: true };
      return { sucess: false, message: '영업을 끝낼 수 없습니다' };
    } catch (err) {
      logger.error(`STOP SERVICE ERROR : ${err}`);
      return { success: false, message: '영업을 끝낼 수 없습니다' };
    }
  },
  updateDriverLocation: async (_, { location }, { dataSources, uid }) => {
    try {
      const { lat, lng } = location;
      const waitingDriverSchema = dataSources.model('WaitingDriver');
      const result = await waitingDriverSchema.findOneAndUpdate({ driver: uid }, { location: [lat, lng] });
      if (result) return { success: true };

      logger.error(`UPDATE DRIVER LOCATION ERROR: 해당 드라이버를 찾을 수 없습니다.`);
      return { success: false, message: '해당 드라이버를 찾을 수 없습니다.' };
    } catch (err) {
      logger.error(`UPDATE DRIVER LOCATION ERROR: ${err}`);
      return { success: false, message: '매칭에 실패했습니다.' };
    }
  },
  approveMatching: async (_, __, { dataSources, uid, pubsub }) => {
    try {
      const driverModel = dataSources.model('Driver');
      const driverInfo = await driverModel.findOne({ _id: uid });
      await pubsub.publish(USER_MATCHED, {
        id: driverInfo._id,
        name: driverInfo.name,
        carModel: driverInfo.carModel,
        carColor: driverInfo.carColor,
        plateNumber: driverInfo.plateNumber,
      });

      const requestingUserModel = dataSources.model('RequestingUser');
      const result = await requestingUserModel.find({ user_id: uid }).remove().exec();
      logger.info(`${uid} matched with driver: ${result}`);
      if (result) return { success: true };
      return { success: false, message: '매칭에 실패했습니다.' };
    } catch (err) {
      logger.error(`APPROVE MATCHING ERROR: ${err}`);
      return { sucess: false, message: '매칭에 실패했습니다.' };
    }
  },
};

export default Mutation;
