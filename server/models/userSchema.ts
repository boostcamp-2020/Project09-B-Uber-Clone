import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  loginType: { type: String, trim: true },
});

export default userSchema;
