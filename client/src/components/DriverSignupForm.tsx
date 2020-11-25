import React, { useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { withFormik, FormikProps } from 'formik';
import SignupLabelInput from './SignupLabelInput';
import driverSignupValidation from '../utils/driverSignupValidation';
import { driverSignupFormValues } from '../types';

const InnerForm: React.ElementType = ({
  values,
  handleSubmit,
  setFieldValue,
  isSubmitting,
  errors,
}: FormikProps<driverSignupFormValues>) => {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (!Object.values(values).every((value) => value.length > 0)) setDisabled(true);
    else setDisabled(false);
  }, [values]);

  return (
    <form>
      <SignupLabelInput
        title="아이디"
        name="id"
        placeholder="아이디를 입력해주세요(6자 이상)"
        value={values.id}
        setFieldValue={setFieldValue}
        error={errors.id}
      />
      <SignupLabelInput
        title="비밀번호"
        name="password"
        placeholder="비밀번호를 입력해주세요(6자 이상)"
        type="password"
        value={values.password}
        setFieldValue={setFieldValue}
        error={errors.password}
      />
      <SignupLabelInput
        title="이름"
        name="userName"
        placeholder="성함을 입력해주세요"
        value={values.userName}
        setFieldValue={setFieldValue}
        error={errors.userName}
      />
      <SignupLabelInput
        title="전화번호"
        name="phone"
        placeholder="전화번호를 입력해주세요"
        value={values.phone}
        setFieldValue={setFieldValue}
        error={errors.phone}
      />
      <SignupLabelInput
        title="면허번호"
        name="licenseNumber"
        placeholder="면허번호를 입력해주세요"
        value={values.licenseNumber}
        setFieldValue={setFieldValue}
        error={errors.licenseNumber}
      />
      <SignupLabelInput
        title="차종"
        name="carModel"
        placeholder="차종을 입력해주세요"
        value={values.carModel}
        setFieldValue={setFieldValue}
        error={errors.carModel}
      />
      <SignupLabelInput
        title="차량 번호"
        name="plateNumber"
        placeholder="차량 번호를 입력해주세요"
        value={values.plateNumber}
        setFieldValue={setFieldValue}
        error={errors.plateNumber}
      />
      <SignupLabelInput
        title="차량 색상"
        name="carColor"
        placeholder="차량 색상을 입력해주세요"
        value={values.carColor}
        setFieldValue={setFieldValue}
        error={errors.carColor}
      />
      <Button
        type="primary"
        loading={isSubmitting}
        style={{ margin: '40px 20px' }}
        onClick={(e: any) => {
          handleSubmit(e);
        }}
        disabled={disabled || isSubmitting}
      >
        회원가입
      </Button>
    </form>
  );
};

const DriverSignupForm = withFormik({
  mapPropsToValues: () => ({
    id: '',
    password: '',
    userName: '',
    phone: '',
    licenseNumber: '',
    carModel: '',
    plateNumber: '',
    carColor: '',
  }),
  handleSubmit: async (values, { props, setSubmitting }: any) => {
    try {
      const { id, password, userName: name, phone, licenseNumber, carModel, plateNumber, carColor } = values;
      const variables = { id, password, name, phone, licenseNumber, carModel, plateNumber, carColor };

      setSubmitting(true);
      const {
        data: {
          driverSignup: { success, message },
        },
      } = await props.addDriver({
        variables,
      });
      setSubmitting(false);

      if (success) props.history.push('/driver/map');
      else props.showAlert(message);
    } catch (e) {
      props.showAlert('오류가 발생했습니다');
    }
  },
  validate: driverSignupValidation,
})(InnerForm);

export default DriverSignupForm as React.ElementType;
