import mongoose from 'mongoose';

const requestingUser = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  startLocation: { type: { type: String }, coordinates: [Number] },
  endLocation: { type: { type: String }, coordinates: [Number] },
});

requestingUser.index({ startLocation: '2dsphere' });
requestingUser.index({ endLocation: '2dsphere' });

export default requestingUser;
