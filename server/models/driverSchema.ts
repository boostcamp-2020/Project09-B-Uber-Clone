import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  id: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  licenseNumber: { type: String, required: true, trim: true },
  carModel: { type: String, required: true, trim: true },
  carColor: { type: String, required: true, trim: true },
  plateNumber: { type: String, required: true, trim: true },
});

export default driverSchema;
