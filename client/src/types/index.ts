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

export interface PathPoint {
  startPoint: Marker;
  endPoint: Marker;
}
