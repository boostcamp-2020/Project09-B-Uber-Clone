import { combineReducers } from 'redux';
import location from './location';
import pathPoint from './pathPoint';
import preData from './preData';

export default combineReducers({
  location,
  pathPoint,
  preData,
});
