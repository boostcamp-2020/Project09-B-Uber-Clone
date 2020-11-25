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
      <InputPhoneNum displayNo={displayNo} setDisplayNext={setDisplayNext} />
      <InputName displayNo={displayNo} setDisplayNext={setDisplayNext} />
      <InputIdPw displayNo={displayNo} setDisplayNext={setDisplayNext} />
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
