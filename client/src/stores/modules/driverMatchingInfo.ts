import { DriverMatchingInfo } from '@custom-types';

const SET = 'driverMatchingInfo/SET' as const;
const CLEAR = 'driverMatchingInfo/CLEAR' as const;

export const setDriverMatchingInfo = (info: DriverMatchingInfo) => ({ type: SET, payload: info });
export const clearDriverMatchingInfo = () => ({ type: CLEAR });

const initialState: DriverMatchingInfo = {};

type DriverMatchingInfoAction = ReturnType<typeof setDriverMatchingInfo> | ReturnType<typeof clearDriverMatchingInfo>;

const driverMatchingInfo = (state = initialState, action: DriverMatchingInfoAction): DriverMatchingInfo => {
  switch (action.type) {
    case SET:
      return { ...action.payload };
    case CLEAR:
      return {};
    default:
      return state;
  }
};

export default driverMatchingInfo;
