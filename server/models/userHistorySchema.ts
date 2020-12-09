import mongoose from 'mongoose';
import requestLocationsShema from './requestLocationsShema';
mongoose.set('useCreateIndex', true);

const userHistorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  request: requestLocationsShema,
  fee: { type: Number, required: true, trim: true },
  startTime: { type: String, required: true, trim: true },
  carModel: { type: String, required: true, trim: true },
  plateNumber: { type: String, required: true, trim: true },
});

export default userHistorySchema;
