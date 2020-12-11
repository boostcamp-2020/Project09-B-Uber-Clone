import { REQUEST_ADDED } from '../subscriptionType';
import { logger } from '../../../config/winston';

export default {
  requestMatching: async (_, { request }, { dataSources, uid, pubsub }) => {
    try {
      const requestingUserSchema = dataSources.model('RequestingUser');
      await requestingUserSchema.find({ user_id: uid }).remove().exec();
      const waitingDriverSchema = dataSources.model('WaitingDriver');
      const userSchema = dataSources.model('User');
      const newRequest = new requestingUserSchema({ ...request, user_id: uid });
      const result = await newRequest.save();
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
      const user = await userSchema.findById(uid);

      await pubsub.publish(REQUEST_ADDED, {
        possibleDrivers,
        driverServiceSub: { uid, request, expirationTime: result.expireTime, tel: user.phone },
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
  saveUserHistory: async (_, args, { dataSources, uid }) => {
    try {
      const userHistoryShema = dataSources.model('UserHistory');
      const newUserHistory = new userHistoryShema({ user_id: uid, ...args });
      await newUserHistory.save();
      return { success: true };
    } catch (err) {
      logger.error(`SAVE USER HISTORY ERROR : ${err}`);
      return { success: false, message: `유저 사용내역 저장에 실패했습니다 : ${err}` };
    }
  },
};
