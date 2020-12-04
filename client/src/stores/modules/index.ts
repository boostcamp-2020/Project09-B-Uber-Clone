import { combineReducers } from 'redux';
import location from './location';
import pathPoint from './pathPoint';
import preData from './preData';
import driverMatchingInfo from './driverMatchingInfo';

export default combineReducers({
  location,
  pathPoint,
  preData,
  driverMatchingInfo,
});
