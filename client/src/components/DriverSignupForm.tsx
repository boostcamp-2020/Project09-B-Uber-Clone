import React, { useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { withFormik, FormikProps } from 'formik';
import SignupLabelInput from './SignupLabelInput';
import { driverSignupFormValues } from '../types';
import 'antd-mobile/lib/button/style/css';

const InnerForm: React.ElementType = ({ values, handleSubmit, setFieldValue }: FormikProps<driverSignupFormValues>) => {
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
        placeholder="아이디를 입력해주세요"
        type="text"
        value={values.id}
        setFieldValue={setFieldValue}
      />
      <SignupLabelInput
        title="비밀번호"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        type="password"
        value={values.password}
        setFieldValue={setFieldValue}
      />
      <SignupLabelInput
        title="이름"
        name="userName"
        placeholder="성함을 입력해주세요"
        type="text"
        value={values.userName}
        setFieldValue={setFieldValue}
      />
      <SignupLabelInput
        title="전화번호"
        name="phoneNumber"
        placeholder="전화번호를 입력해주세요"
        type="text"
        value={values.phoneNumber}
        setFieldValue={setFieldValue}
      />
      <SignupLabelInput
        title="면허번호"
        name="licenseNumber"
        placeholder="면허번호를 입력해주세요"
        type="text"
        value={values.licenseNumber}
        setFieldValue={setFieldValue}
      />
      <SignupLabelInput
        title="차종"
        name="carName"
        placeholder="차종을 입력해주세요"
        type="text"
        value={values.carName}
        setFieldValue={setFieldValue}
      />
      <SignupLabelInput
        title="차량 번호"
        name="plateNumber"
        placeholder="차 번호를 입력해주세요"
        type="text"
        value={values.plateNumber}
        setFieldValue={setFieldValue}
      />
      <SignupLabelInput
        title="차량 색상"
        name="carColor"
        placeholder="차량 색상을 입력해주세요"
        type="text"
        value={values.carColor}
        setFieldValue={setFieldValue}
      />
      <Button
        type="primary"
        style={{ margin: '40px 20px' }}
        onClick={(e: any) => {
          handleSubmit(e);
        }}
        disabled={disabled}
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
    phoneNumber: '',
    licenseNumber: '',
    carName: '',
    plateNumber: '',
    carColor: '',
  }),
  handleSubmit: (values, { setSubmitting, setErrors }) => {
    console.log(values);
  },
})(InnerForm);

export default DriverSignupForm;
