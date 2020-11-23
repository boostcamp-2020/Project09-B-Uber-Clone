import mongoose from 'mongoose';
import driverSchema from './driverSchema';
import geoSchema from './geoSchema';

const waitingDriver = new mongoose.Schema({
  driver: driverSchema,
  location: geoSchema,
});

export default waitingDriver;
