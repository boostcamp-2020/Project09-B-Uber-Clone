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
  carType: string;
  plateNumber: string;
  carColor: string;
}
