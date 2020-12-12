import React, { useState, useCallback } from 'react';
import LoginLabel from './SigninLabel';
import styled from 'styled-components';
import { InputItem, Button } from 'antd-mobile';
import { LoginFormPropsType } from '@custom-types';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { SIGNIN } from '@queries/signin';

const LoginForm: React.FC<LoginFormPropsType> = ({ type }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [signin] = useMutation(SIGNIN);
  const history = useHistory();
  const onChangeId = useCallback((value: string) => {
    setId(value);
  }, []);

  const onChangePassword = useCallback((value: string) => {
    setPassword(value);
  }, []);

  const onClickHandler = async () => {
    const isUser = type === 'user';
    if (!id.length || !password.length) {
      alert('아이디와 비밀번호를 모두 입력하세요');
    } else {
      const variables = { type, id, password };
      const {
        data: {
          signin: { success, message },
        },
      } = await signin({ variables });

      if (success) history.push(isUser ? '/user/map' : '/driver/main');
      else alert(message);
    }
  };

  return (
    <Form>
      <LoginLabel>아이디를 입력하세요</LoginLabel>
      <InputItem type="text" placeholder="아이디" value={id} onChange={onChangeId} required />
      <LoginLabel>비밀번호를 입력하세요</LoginLabel>
      <InputItem type="password" placeholder="비밀번호" value={password} onChange={onChangePassword} required />
      <Button type="primary" onClick={onClickHandler}>
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
