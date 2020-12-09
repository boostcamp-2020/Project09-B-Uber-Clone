import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: { type: String, default: 'Undefined Location Name' },
  latlng: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

export default locationSchema;
