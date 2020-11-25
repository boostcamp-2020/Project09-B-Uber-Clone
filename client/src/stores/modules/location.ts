import { Location } from '../../types';

const UPDATE = 'location/UPDATE' as const;

export const updateLocation = (location: Location) => ({ type: UPDATE, payload: location });

const initialState: Location = {
  lat: 37.5006226,
  lng: 127.0231786,
};

type LocationAction = ReturnType<typeof updateLocation>;

export const location = (state = initialState, action: LocationAction): Location => {
  switch (action.type) {
    case UPDATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
