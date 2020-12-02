import React, { useState } from 'react';
import { List, InputItem, Toast } from 'antd-mobile';
import styled from 'styled-components';
import { signupLabelInputProps } from '@custom-types';

const SignupLabelInput: React.FC<signupLabelInputProps> = ({
  title,
  name,
  placeholder,
  type = 'text',
  value,
  setFieldValue,
  error,
}) => {
  const [visited, setVisited] = useState(false);

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
            if (!visited) setVisited(true);
            setFieldValue(name, e);
          }}
          error={visited && !!error}
          onErrorClick={() => {
            Toast.info(error);
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
