export interface Location {
  lat: number;
  lng: number;
}

export interface Marker {
  lat: number;
  lng: number;
  color: string;
}

export interface TaxiMarker {
  lat: number;
  lng: number;
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
  startPoint: Marker;
  endPoint: Marker;
}

export interface LoginFormPropsType {
  signin: any;
  history: any;
  userType: string;
}
