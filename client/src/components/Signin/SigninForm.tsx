import React, { useState } from 'react';
import LoginLabel from './SigninLabel';
import styled from 'styled-components';
import { InputItem, Button } from 'antd-mobile';
import { LoginFormPropsType } from '@custom-types';

const LoginForm: React.FC<LoginFormPropsType> = (props) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = (value: string) => {
    setId(value);
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onClickHandler = async () => {
    if (!id.length || !password.length) {
      alert('아이디와 비밀번호를 모두 입력하세요');
    } else {
      const variables = { id, password };
      const {
        data: {
          userSignin: { success, message },
        },
      } = await props.signin({ variables });

      if (success) props.history.push(`/${props.userType}/map`);
      else alert(message);
    }
  };

  return (
    <Form>
      <LoginLabel>아이디를 입력하세요</LoginLabel>
      <InputItem type="text" placeholder="아이디" value={id} onChange={onChangeId} required />
      <LoginLabel>비밀번호를 입력하세요</LoginLabel>
      <InputItem type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} required />
      <Button type="primary" onClick={onClickHandler} {...props}>
        로그인
      </Button>
    </Form>
  );
};

const Form = styled.div`
  padding: 0 20%;
  & .am-button {
    margin-top: 50px;
    background-color: #181818;
    font-weight: bold;
    border: none;
    cursor: pointer;
  }
`;

export default LoginForm;
