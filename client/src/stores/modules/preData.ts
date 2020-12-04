import { Info, PreData } from '@custom-types';

export const UPDATE_PATH = 'path/UPDATE_PATH' as const;

const initialState: PreData = {
  isSetPath: false,
  info: {
    time: '0분',
    fee: 0,
  },
};

export const updatePath = (info: Info) => ({ type: UPDATE_PATH, payload: info });

type ActionType = ReturnType<typeof updatePath>;

const preData = (state = initialState, action: ActionType): PreData => {
  switch (action.type) {
    case UPDATE_PATH:
      return { ...state, isSetPath: true, info: action.payload };
    default:
      return state;
  }
};

export default preData;
