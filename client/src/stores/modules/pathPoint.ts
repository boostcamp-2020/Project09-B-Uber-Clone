import { Location, PathPoint } from '@custom-types';

const UPDATE_START_POINT = 'pathPoint/UPDATE_START' as const;
const UPDATE_END_POINT = 'pathPoint/UPDATE_END' as const;

export const updateStartPoint = (location: Location, name?: string) => ({
  type: UPDATE_START_POINT,
  payload: { location, name },
});
export const updateEndPoint = (location: Location, name?: string) => ({
  type: UPDATE_END_POINT,
  payload: { location, name },
});

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
  startPointName: '',
  endPointName: '',
};

type ActionType = ReturnType<typeof updateStartPoint> | ReturnType<typeof updateEndPoint>;

const startPoint = (state = initialState, action: ActionType): PathPoint => {
  switch (action.type) {
    case UPDATE_START_POINT:
      return {
        ...state,
        isSetStartPoint: true,
        startPoint: { ...action.payload.location, color: state.startPoint.color },
        startPointName: action.payload.name,
      };
    case UPDATE_END_POINT:
      return {
        ...state,
        isSetEndPoint: true,
        endPoint: { ...action.payload.location, color: state.endPoint.color },
        endPointName: action.payload.name,
      };
    default:
      return state;
  }
};

export default startPoint;
