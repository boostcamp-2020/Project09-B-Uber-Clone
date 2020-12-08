import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import InputPhoneNum from '@components/userSignup/InputPhoneNum';
import InputName from '@components/userSignup/InputName';
import InputIdPw from '@components/userSignup/InputIdPw';
const UserSignupPage: React.FC = () => {
  const [page, setPage] = useState(0);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const setNextPage = useCallback(() => setPage(page + 1), [page]);

  return (
    <Div>
      <H2>
        환영해요,
        <br /> 택시자버입니다.
      </H2>
      <InputPhoneNum page={page} setNextPage={setNextPage} phone={phone} setPhone={setPhone} />
      <InputName page={page} setNextPage={setNextPage} name={name} setName={setName} />
      <InputIdPw page={page} phone={phone} name={name} />
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
