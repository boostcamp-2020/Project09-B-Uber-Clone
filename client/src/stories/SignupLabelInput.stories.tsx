import React, { useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { text } from '@storybook/addon-knobs';

import SignupLabelTitle from '../components/SignupLabelInput';

export default {
  title: 'SignupLabelTitle',
  component: SignupLabelTitle,
} as Meta;

export const signupLabelAndTitle: React.FC = () => {
  const name = 'example';
  const [value, setValue] = useState('');
  const setFieldValue = (_, e) => {
    setValue(e);
  };

  return (
    <SignupLabelTitle
      title={text('타이틀', '아이디')}
      name={name}
      placeholder={text('기본 문구', '아이디를 입력하세요')}
      type="text"
      value={value}
      setFieldValue={setFieldValue}
    />
  );
};
