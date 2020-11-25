import React, { useState, createContext, useEffect } from 'react';
import styled from 'styled-components';
import InputPhoneNum from '../../components/UserSignup/InputPhoneNum';
import InputName from '../../components/UserSignup/InputName';
import InputIdPw from '../../components/UserSignup/InputIdPw';
const UserSignupPage: React.FC = () => {
  const [displayNo, setDisplayNo] = useState(0);
  const setDisplayNext = () => {
    setDisplayNo(displayNo + 1);
  };

  return (
    <Div>
      <H2>
        환영해요,
        <br /> 자버택시입니다.
      </H2>
const UserSignupPage: React.FC = () => {
  return <div>유저 회원가입 페이지</div>;
      <InputPhoneNum />
      <InputName />
      <InputIdPw />
    </Div>
  );
};
const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-around;
`;
const H2 = styled.h2`
  margin: 30% 5%;
  font-size: 25px;
  font-weight: 700;
`;

export default UserSignupPage;
