import { Info, PreData } from '@custom-types';

export const UPDATE_PATH = 'path/UPDATE_PATH' as const;
export const CLEAR_PREDATA = 'path/CLEAR_PREDATA' as const;

const initialState: PreData = {
  isSetPath: false,
  info: {
    time: '0분',
    fee: 0,
  },
};

export const updatePath = (info: Info) => ({ type: UPDATE_PATH, payload: info });
export const clearPreData = () => ({ type: CLEAR_PREDATA });

type ActionType = ReturnType<typeof updatePath> | ReturnType<typeof clearPreData>;

const preData = (state = initialState, action: ActionType): PreData => {
  switch (action.type) {
    case UPDATE_PATH:
      return { ...state, isSetPath: true, info: action.payload };
    case CLEAR_PREDATA:
      return initialState;
    default:
      return state;
  }
};

export default preData;
