import mongoose from 'mongoose';

const geoSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lang: { type: Number, required: true },
});

export default geoSchema;
