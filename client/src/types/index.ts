export interface Location {
  lat: number;
  lng: number;
}

export interface Marker extends Location {
  color: string;
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
  displayNo: number;
  phone: string;
  setDisplayNext: () => void;
  setPhone: (v: string) => void;
}

export interface InputNameProps {
  displayNo: number;
  name: string;
  setDisplayNext: () => void;
  setName: (v: string) => void;
}

export interface InputIdPwProps {
  displayNo: number;
  phone: string;
  name: string;
}

export interface LoginFormPropsType {
  signin: any;
  history: any;
}
