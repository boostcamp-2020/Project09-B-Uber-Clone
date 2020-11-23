import mongoose from 'mongoose';
import geoSchema from './geoSchema';

const requestingUSer = {
  user_id: mongoose.Schema.Types.ObjectId,
  startLocation: geoSchema,
  endLocation: geoSchema,
};

export default requestingUSer;
