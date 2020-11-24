export interface signupLabelInputProps {
  title: string;
  placeholder: string;
  name: string;
  type: 'number' | 'text' | 'phone' | 'password';
  value: string;
  setFieldValue: any;
}

export interface driverSignupFormValues {
  id: string;
  password: string;
  userName: string;
  phoneNumber: string;
  licenseNumber: string;
  carName: string;
  plateNumber: string;
  carColor: string;
}
