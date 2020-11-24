import React from 'react';
import { List, InputItem } from 'antd-mobile';
import styled from 'styled-components';
import { signupLabelInputProps } from '../types';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/input-item/style/css';

const SignupLabelInput: React.FC<signupLabelInputProps> = ({
  title,
  name,
  placeholder,
  type,
  value,
  setFieldValue,
}) => {
  return (
    <Wrapper>
      <List renderHeader={() => title}>
        <InputItem
          clear
          placeholder={placeholder}
          name={name}
          type={type}
          value={value}
          onChange={(e) => {
            setFieldValue(name, e);
          }}
        />
      </List>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 10px 20px;
`;

export default SignupLabelInput;
