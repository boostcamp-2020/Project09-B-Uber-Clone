import { REQUEST_ADDED } from '../subscriptionType';
import { logger } from '../../../config/winston';

const SERVER_ERROR = { success: false, message: '오류가 발생했습니다' };
export default {
  requestMatching: async (_, { request }, { dataSources, uid, pubsub }) => {
    try {
      const requestingUserSchema = dataSources.model('RequestingUser');
      const result = await requestingUserSchema
        .findOneAndUpdate(
          { user_id: uid },
          { ...request, user_id: uid, expireTime: new Date().getTime() + 1000 * 10 },
          { new: true, upsert: true, setDefaultsOnInsert: true },
        )
        .populate('user_id');

      const waitingDriverSchema = dataSources.model('WaitingDriver');
      const startLocationLatLng = request.startLocation.latlng;
      const area = {
        center: [startLocationLatLng.lng, startLocationLatLng.lat],
        radius: 3 / 3963.2, // radian
        unique: true,
        spherical: true,
      };
      const possibleDrivers = await waitingDriverSchema
        .find({ isWorking: false })
        .where('location')
        .within()
        .circle(area);

      await pubsub.publish(REQUEST_ADDED, {
        possibleDrivers,
        driverServiceSub: { uid, request, expirationTime: result.expireTime, tel: result.user_id.phone },
      });
      if (result) {
        logger.info(
          `Driver matched: ${Object.entries(possibleDrivers)
            .map(([_, driver]) => {
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
      return SERVER_ERROR;
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
      return SERVER_ERROR;
    }
  },
  saveUserHistory: async (_, { info }, { dataSources, uid }) => {
    try {
      const userHistoryShema = dataSources.model('UserHistory');
      const newUserHistory = new userHistoryShema({ user_id: uid, ...info });
      await newUserHistory.save();
      return { success: true };
    } catch (err) {
      logger.error(`SAVE USER HISTORY ERROR : ${err}`);
      return { success: false, message: `유저 사용내역 저장에 실패했습니다 : ${err}` };
    }
  },
};
