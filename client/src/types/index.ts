export interface Location {
  lat: number;
  lng: number;
}

export interface TaxiMarker {
  lat: number;
  lng: number;
}

export interface TaxiData {
  id: string;
  name: string;
  carModel: string;
  carColor: string;
  plateNumber: string;
}

export interface signupLabelInputProps {
  title: string;
  placeholder: string;
  name: string;
  type?: 'number' | 'text' | 'phone' | 'password';
  value: string;
  setFieldValue: any;
  error: string | undefined;
}

export interface driverSignupFormValues {
  id: string;
  password: string;
  userName: string;
  phone: string;
  licenseNumber: string;
  carModel: string;
  plateNumber: string;
  carColor: string;
}

export interface InputPhoneProps {
  page: number;
  phone: string;
  setNextPage: () => void;
  setPhone: (v: string) => void;
}

export interface InputNameProps {
  page: number;
  name: string;
  setNextPage: () => void;
  setName: (v: string) => void;
}

export interface InputIdPwProps {
  page: number;
  phone: string;
  name: string;
}

export interface PathPoint {
  isSetStartPoint: boolean;
  isSetEndPoint: boolean;
  startPoint: Location;
  endPoint: Location;
  startPointName?: string;
  endPointName?: string;
  startPlaceId?: string;
  endPlaceId?: string;
}

export interface LoginFormPropsType {
  signin: any;
  userType: string;
}
export interface Info {
  time: string;
  fee: number;
}
export interface PreData {
  isSetPath: boolean;
  info: Info;
}

export interface Response {
  success: boolean;
  message: string;
}

export interface LocationWithName {
  name: string;
  latlng: Location;
}

export interface DriverMatchingInfo {
  uid?: string;
  tel?: string;
  request?: Request;
}

export interface Request {
  startLocation: LocationWithName;
  endLocation: LocationWithName;
}
