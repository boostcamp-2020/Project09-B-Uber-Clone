import mongoose from 'mongoose';
import requestLocationsShema from './requestLocationsShema';
const userHistorySchema = new mongoose.Schema({
  user_id: { type: String, required: true, trim: true },
  request: requestLocationsShema,
  fee: { type: Number, required: true, trim: true },
  startTime: { type: String, required: true, trim: true },
  endTime: { type: String, required: true, trim: true },
  carModel: { type: String, required: true, trim: true },
  plateNumber: { type: String, required: true, trim: true },
});

export default userHistorySchema;
