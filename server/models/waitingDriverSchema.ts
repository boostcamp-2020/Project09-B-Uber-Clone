import mongoose from 'mongoose';
import pointSchema from './pointSchema';

const waitingDriver = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  isWorking: { type: Boolean, default: false },
  location: pointSchema,
});

waitingDriver.index({ location: '2dsphere' });

export default waitingDriver;
