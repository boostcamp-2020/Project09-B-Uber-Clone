import mongoose from 'mongoose';
import pointSchema from './pointSchema';

const requestingUser = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  startLocation: pointSchema,
  endLocation: pointSchema,
  phone: { type: String },
  createdAt: { type: Date, expires: 1000 * 10, default: Date.now },
  expireTime: { type: Date, default: () => Date.now() + 1000 * 10 },
});

requestingUser.index({ startLocation: '2dsphere' });
requestingUser.index({ endLocation: '2dsphere' });

export default requestingUser;
