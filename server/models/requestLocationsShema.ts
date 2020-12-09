import mongoose from 'mongoose';
import locationSchema from './locationSchema';

const requestLocations = new mongoose.Schema({
  startLocation: locationSchema,
  endLocation: locationSchema,
});

export default requestLocations;
