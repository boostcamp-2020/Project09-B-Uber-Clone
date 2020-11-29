import { Location, PathPoint } from '@custom-types';

const UPDATE_START_POINT = 'pathPoint/UPDATE_START' as const;
const UPDATE_END_POINT = 'pathPoint/UPDATE_END' as const;

export const updateStartPoint = (location: Location) => ({ type: UPDATE_START_POINT, payload: location });
export const updateEndPoint = (location: Location) => ({ type: UPDATE_END_POINT, payload: location });

const initialState: PathPoint = {
  isSetStartPoint: false,
  startPoint: {
    lat: 0,
    lng: 0,
    color: '#4285F4',
  },
  isSetEndPoint: false,
  endPoint: {
    lat: 0,
    lng: 0,
    color: '#FBBC04',
  },
};

type ActionType = ReturnType<typeof updateStartPoint> | ReturnType<typeof updateEndPoint>;

const startPoint = (state = initialState, action: ActionType): PathPoint => {
  switch (action.type) {
    case UPDATE_START_POINT:
      return { ...state, isSetStartPoint: true, startPoint: { ...action.payload, color: state.startPoint.color } };
    case UPDATE_END_POINT:
      return { ...state, isSetEndPoint: true, endPoint: { ...action.payload, color: state.endPoint.color } };
    default:
      return state;
  }
};

export default startPoint;
