import { Location, PathPoint } from '@custom-types';

const UPDATE_START = 'pathPoint/UPDATE_START' as const;
const UPDATE_END = 'pathPoint/UPDATE_END' as const;

export const updateStartPoint = (location: Location) => ({ type: UPDATE_START, payload: location });
export const updateEndPoint = (location: Location) => ({ type: UPDATE_END, payload: location });

const initialState: PathPoint = {
  startPoint: {
    lat: 9999,
    lng: 9999,
    color: '#4285F4',
  },
  endPoint: {
    lat: 9999,
    lng: 9999,
    color: '#FBBC04',
  },
};

type ActionType = ReturnType<typeof updateStartPoint> | ReturnType<typeof updateEndPoint>;

const startPoint = (state = initialState, action: ActionType): PathPoint => {
  switch (action.type) {
    case UPDATE_START:
      return { ...state, startPoint: { ...action.payload, color: state.startPoint.color } };
    case UPDATE_END:
      return { ...state, endPoint: { ...action.payload, color: state.endPoint.color } };
    default:
      return state;
  }
};

export default startPoint;
