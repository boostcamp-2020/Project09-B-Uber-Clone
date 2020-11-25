import React, { useState } from 'react';
import LoginLabel from './LoginLabel';
import styled from 'styled-components';
import { InputItem, Button } from 'antd-mobile';

export interface FormPropsType {
  onChange: () => void;
}

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

const LoginForm: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = (value: string) => {
    setId(value);
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onClickHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (id.length === 0 || password.length === 0) {
      alert('아이디와 비밀번호를 모두 입력하세요');
    }
    // Todo
    // 로그인 기능 연동
  };

  return (
    <Form>
      <LoginLabel>아이디를 입력하세요</LoginLabel>
      <InputItem type="text" placeholder="아이디" value={id} onChange={(v) => onChangeId(v)} required />
      <LoginLabel>비밀번호를 입력하세요</LoginLabel>
      <InputItem
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(v) => onChangePassword(v)}
        required
      />
      <Button type="primary" onClick={onClickHandler}>
        로그인
      </Button>
    </Form>
  );
};

export default LoginForm;
