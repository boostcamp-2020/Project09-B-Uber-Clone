import mongoose from 'mongoose';

const waitingDriver = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  location: { type: { type: String }, coordinates: [Number] },
});

waitingDriver.index({ location: '2dsphere' });

export default waitingDriver;
