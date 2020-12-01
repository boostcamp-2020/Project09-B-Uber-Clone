import mongoose from 'mongoose';
import driverSchema from './driverSchema';

const waitingDriver = new mongoose.Schema({
  driver: driverSchema,
  location: { type: { type: String }, coordinates: [Number] },
});

waitingDriver.index({ location: '2dsphere' });

export default waitingDriver;
