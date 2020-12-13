import React, { useState, useCallback } from 'react';
import LoginLabel from './SigninLabel';
import styled from 'styled-components';
import { InputItem, Button } from 'antd-mobile';
import { LoginFormPropsType } from '@custom-types';

const LoginForm: React.FC<LoginFormPropsType> = (props) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = useCallback((value: string) => {
    setId(value);
  }, []);

  const onChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const onClickHandler = async () => {
    if (!id.length || !password.length) {
      alert('아이디와 비밀번호를 모두 입력하세요');
    } else {
      const variables = { id, password };
      const isUser = props.userType === 'user';
      const mutation = isUser ? 'userSignin' : 'driverSignin';
      const {
        data: {
          [mutation]: { success, message },
        },
      } = await props.signin({ variables });

      if (success) props.history.push(isUser ? '/user/map' : '/driver/main');
      else alert(message);
    }
  };

  return (
    <Form>
      <LoginLabel>아이디를 입력하세요</LoginLabel>
      <InputItem type="text" placeholder="아이디" value={id} onChange={onChangeId} required data-test-id={'id-input'} />
      <LoginLabel>비밀번호를 입력하세요</LoginLabel>
      <InputItem
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={onChangePassword}
        required
        data-test-id={'pw-input'}
      />
      <Button type="primary" onClick={onClickHandler} data-test-id={'sign-in-btn'} {...props}>
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
