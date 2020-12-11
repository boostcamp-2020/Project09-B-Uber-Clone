import { Location } from '@custom-types';

const UPDATE_CENTER = 'center/UPDATE' as const;

export const updateCenter = (location: Location) => ({ type: UPDATE_CENTER, payload: location });

const initialState: Location = {
  lat: 37.5006226,
  lng: 127.0231786,
};

type LocationAction = ReturnType<typeof updateCenter>;

const center = (state = initialState, action: LocationAction): Location => {
  switch (action.type) {
    case UPDATE_CENTER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default center;
