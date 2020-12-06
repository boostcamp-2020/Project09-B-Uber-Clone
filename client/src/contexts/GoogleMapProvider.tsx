import React, { useEffect, useReducer, Dispatch, useContext } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface State {
  loaded: boolean;
  directionRenderer: google.maps.DirectionsRenderer | null;
}

type Action = { type: 'updateApiState'; loaded: boolean; directionRenderer: google.maps.DirectionsRenderer };

type IDispatch = Dispatch<Action>;

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '',
  libraries: ['places'],
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'updateApiState':
      return { ...state, loaded: action.loaded, directionRenderer: action.directionRenderer };
    default:
      throw new Error(`Wrong action`);
  }
};

export const GoogleMapApiState = React.createContext<State | null>(null);
export const GoogleMapApiDispatch = React.createContext<IDispatch | null>(null);

const initialState = { loaded: false, directionRenderer: null };

const GoogleMapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialScriptLoad = async () => {
    await loader.load();
    dispatch({
      type: 'updateApiState',
      loaded: true,
      directionRenderer: new google.maps.DirectionsRenderer({ suppressMarkers: true }),
    });
  };

  useEffect(() => {
    initialScriptLoad();
  }, []);

  return (
    <GoogleMapApiState.Provider value={state}>
      <GoogleMapApiDispatch.Provider value={dispatch}>{children}</GoogleMapApiDispatch.Provider>
    </GoogleMapApiState.Provider>
  );
};

export function useGoogleMapApiState(): State {
  const state = useContext(GoogleMapApiState);
  if (!state) throw new Error('Cannot find GoogleMapApiProvider');
  return state;
}

export function useGoogleMapApiDispatch(): IDispatch {
  const dispatch = useContext(GoogleMapApiDispatch);
  if (!dispatch) throw new Error('Cannot find GoogleMapApiProvider');
  return dispatch;
}

export default GoogleMapProvider;
