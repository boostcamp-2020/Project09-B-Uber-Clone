import mongoose from 'mongoose';
import pointSchema from './pointSchema';

const requestingUser = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  startLocation: pointSchema,
  endLocation: pointSchema,
  phone: { type: String },
  expireTime: { type: Date },
  createdAt: { type: Date, expires: 60, default: Date.now },
});

requestingUser.index({ startLocation: '2dsphere' });
requestingUser.index({ endLocation: '2dsphere' });

export default requestingUser;
