import mongoose from 'mongoose';
import { logger } from '../../../config/winston';
import { USER_MATCHED, USER_ON_BOARD, UPDATE_LOCATION, ARRIVE_DESTINATION } from '../subscriptionType';

const SERVER_ERROR = { success: false, message: '오류가 발생했습니다' };
const MATCHING_FAILED = { success: false, message: '매칭에 실패했습니다.' };

export default {
  startService: async (_, __, { dataSources, uid }) => {
    const errorMessage = { success: false, message: '영업을 시작 할 수 없습니다.' };
    try {
      const waitingDriver = await dataSources.model('WaitingDriver');
      const existingWaitingDriver = await waitingDriver.findOneAndUpdate({ driver: uid }, { isWorking: false });
      if (existingWaitingDriver) return { success: true };
      const newWaitingDriver = new waitingDriver({ driver: uid, isWorking: false });
      const result = await newWaitingDriver.save();

      logger.info(`${uid} start service: ${result}`);
      if (result) return { success: true };
      return errorMessage;
    } catch (err) {
      logger.error(`START SERVICE ERROR : ${err}`);
      return errorMessage;
    }
  },
  stopService: async (_, __, { dataSources, uid }) => {
    const errorMessage = { success: false, message: '영업을 끝낼 수 없습니다' };
    try {
      const waitingDriver = await dataSources.model('WaitingDriver');
      const result = await waitingDriver.findOneAndRemove({ driver: uid, isWorking: false });
      logger.info(`${uid} stop service: ${result}`);
      if (result) return { success: true };
      return errorMessage;
    } catch (err) {
      logger.error(`STOP SERVICE ERROR : ${err}`);
      return errorMessage;
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
      if (uid) await pubsub.publish(UPDATE_LOCATION, { uid, driverLocationSub: { ...location } });
      if (result) return { success: true };

      logger.error(`UPDATE DRIVER LOCATION ERROR: 해당 드라이버를 찾을 수 없습니다.`);
      return { success: false, message: '해당 드라이버를 찾을 수 없습니다.' };
    } catch (err) {
      logger.error(`UPDATE DRIVER LOCATION ERROR: ${err}`);
      return MATCHING_FAILED;
    }
  },
  approveMatching: async (_, { uid }, { dataSources, uid: driverId, pubsub }) => {
    try {
      const requestingUserModel = dataSources.model('RequestingUser');
      const result = await requestingUserModel.deleteMany({ user_id: mongoose.Types.ObjectId(uid) });
      if (!result.deletedCount) return { success: false, message: '이미 배차가 완료된 요청입니다.' };

      const waitingDriverModel = dataSources.model('WaitingDriver');
      const matchedDriver = await waitingDriverModel
        .findOne({ driver: mongoose.Types.ObjectId(driverId) })
        .populate('driver');
      const [lng, lat] = matchedDriver.location.coordinates;

      await pubsub.publish(USER_MATCHED, {
        uid,
        userMatchingSub: {
          id: matchedDriver.driver._id,
          name: matchedDriver.driver.name,
          carModel: matchedDriver.driver.carModel,
          carColor: matchedDriver.driver.carColor,
          plateNumber: matchedDriver.driver.plateNumber,
          location: { lng, lat },
        },
      });
      matchedDriver.isWorking = true;
      matchedDriver.save();
      logger.info(`${uid} matched with driver: ${result}`);
      return { success: true };
    } catch (err) {
      logger.error(`APPROVE MATCHING ERROR: ${err}`);
      return MATCHING_FAILED;
    }
  },
  userOnBoard: async (_, { uid }, { pubsub }) => {
    try {
      await pubsub.publish(USER_ON_BOARD, { uid, driverLocationSub: { board: true } });
      return { success: true };
    } catch (err) {
      return SERVER_ERROR;
    }
  },
  arriveDestination: async (_, { uid }, { dataSources, uid: driverId, pubsub }) => {
    try {
      await pubsub.publish(ARRIVE_DESTINATION, { uid, driverLocationSub: { arrive: true } });
      const waitingDriverSchema = await dataSources.model('WaitingDriver');
      const result = await waitingDriverSchema.findOneAndUpdate(
        { driver: mongoose.Types.ObjectId(driverId) },
        { isWorking: false },
      );

      if (result) {
        logger.info(`${driverId} arrived destination: ${result}`);
        return { success: true };
      }
      logger.error(`${driverId} DRIVER ARRIVE ERROR`);
      return { success: false, message: '운행을 종료 할 수 없습니다.' };
    } catch (err) {
      return SERVER_ERROR;
    }
  },
};
