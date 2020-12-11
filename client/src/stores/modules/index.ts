import { combineReducers } from 'redux';
import location from './location';
import pathPoint from './pathPoint';
import preData from './preData';
import driverMatchingInfo from './driverMatchingInfo';
import center from './center';

export default combineReducers({
  location,
  pathPoint,
  preData,
  driverMatchingInfo,
  center,
});
