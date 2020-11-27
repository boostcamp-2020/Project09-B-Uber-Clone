import { combineReducers } from 'redux';
import location from './location';
import pathPoint from './pathPoint';

export default combineReducers({
  location,
  pathPoint,
});
