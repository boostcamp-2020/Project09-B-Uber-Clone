import { driverSignupFormValues } from '../types';

const driverSignupValidation: any = (values: driverSignupFormValues) => {
  const necessaryMessage = '필수 항목입니다';
  const wrongFormatMessage = '잘못된 양식입니다';
  const { id, password, userName, phone, licenseNumber, carModel, plateNumber, carColor } = values;

  if (!id.length) return { id: necessaryMessage };
  if (!password.length) return { password: necessaryMessage };
  if (!userName.length) return { userName: necessaryMessage };
  if (!phone.length) return { phone: necessaryMessage };
  if (!licenseNumber.length) return { licenseNumber: necessaryMessage };
  if (!carModel.length) return { carModel: necessaryMessage };
  if (!plateNumber.length) return { plateNumber: necessaryMessage };
  if (!carColor.length) return { carColor: necessaryMessage };

  if (id.length < 6) return { id: '아이디는 6자리 이상이어야 합니다' };
  if (id.split(' ').length !== 1) return { id: wrongFormatMessage };

  if (password.length < 6) return { password: '비밀번호는 6자리 이상이어야 합니다' };
  if (password.split(' ').length !== 1) return { password: wrongFormatMessage };

  const phoneNumberRegex = /^\d{7,20}$/;
  if (!phoneNumberRegex.test(phone.split('-').join(''))) return { phone: wrongFormatMessage };
};

export default driverSignupValidation;
