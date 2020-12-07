import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Config from '../../config';
import { logger } from '../../config/winston';
import { REQUEST_ADDED, USER_MATCHED, USER_ON_BOARD, UPDATE_LOCATION } from './subscriptionType';

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
      const waitingDriverSchema = dataSources.model('WaitingDriver');
      const newRequest = new requestingUserSchema({ ...request, user_id: uid });
      const result = await newRequest.save();
      const startLocationLatLng = request.startLocation.latlng;
      const area = {
        center: [startLocationLatLng.lng, startLocationLatLng.lat],
        radius: 3 / 3963.2, // radian
        unique: true,
        spherical: true,
      };
      const possibleDrivers = await waitingDriverSchema.find().where('location').within().circle(area);

      await pubsub.publish(REQUEST_ADDED, {
        possibleDrivers,
        driverServiceSub: { uid, request, expirationTime: result.expireTime }, // requestTime을 DB에 insert할 때로 변경
      });
      if (result) {
        logger.info(
          `Driver matched: ${Object.entries(possibleDrivers)
            .map(([_, driver], i) => {
              return `${driver['_id']}, ${driver['id']}, ${driver['name']}`;
            })
            .join('\n')}`,
        );
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
  updateDriverLocation: async (_, { location, uid }, { dataSources, uid: driverId, pubsub }) => {
    try {
      const { lat, lng } = location;
      const waitingDriverSchema = dataSources.model('WaitingDriver');
      const result = await waitingDriverSchema.findOneAndUpdate(
        { driver: driverId },
        { location: { coordinates: [lng, lat] } },
      );
      if (uid) await pubsub(UPDATE_LOCATION, { uid, driverLocationSub: { location } });
      if (result) return { success: true };

      logger.error(`UPDATE DRIVER LOCATION ERROR: 해당 드라이버를 찾을 수 없습니다.`);
      return { success: false, message: '해당 드라이버를 찾을 수 없습니다.' };
    } catch (err) {
      logger.error(`UPDATE DRIVER LOCATION ERROR: ${err}`);
      return { success: false, message: '매칭에 실패했습니다.' };
    }
  },
  approveMatching: async (_, { uid }, { dataSources, uid: driverId, pubsub }) => {
    try {
      const driverModel = dataSources.model('Driver');
      const driverInfo = await driverModel.findOne({ _id: driverId });
      await pubsub.publish(USER_MATCHED, {
        uid,
        userMatchingSub: {
          id: driverInfo._id,
          name: driverInfo.name,
          carModel: driverInfo.carModel,
          carColor: driverInfo.carColor,
          plateNumber: driverInfo.plateNumber,
        },
      });

      const requestingUserModel = dataSources.model('RequestingUser');
      const result = await requestingUserModel.deleteOne({ user_id: mongoose.Types.ObjectId(uid) });
      logger.info(`${uid} matched with driver: ${result}`);
      if (result) {
        const waitingDriver = dataSources.model('WaitingDriver');
        const res = await waitingDriver.deleteOne({ _id: driverId });
        if (res) return { success: true };
        return { success: false, message: '대기 중인 드라이버 정보를 찾을 수 없습니다.' };
      }
      return { success: false, message: '이미 배차가 완료된 요청입니다.' };
    } catch (err) {
      logger.error(`APPROVE MATCHING ERROR: ${err}`);
      return { sucess: false, message: '매칭에 실패했습니다.' };
    }
  },
  userOnBoard: async (_, { uid }, { pubsub }) => {
    try {
      await pubsub.publish(USER_ON_BOARD, { uid, driverLocationSub: { board: true } });
      console.log(uid);
      return { success: true };
    } catch (err) {
      return { success: false, message: '오류가 발생했습니다' };
    }
  },

  arriveDestination: async (_, { dataSources, uid }) => {
    try {
      const waitingDriver = await dataSources.model('WaitingDriver');
      const existingWaitingDriver = await waitingDriver.findOne({ driver: uid });
      if (existingWaitingDriver) return { success: true };
      const newWaitingDriver = new waitingDriver({ driver: uid });
      const result = await newWaitingDriver.save();

      logger.info(`${uid} arrived destination: ${result}`);
      if (result) return { success: true };
      return { success: false, message: '운행을 종료 할 수 없습니다.' };
    } catch (err) {
      return { success: false, message: '오류가 발생했습니다.' };
    }
  },
};

export default Mutation;
