import React from 'react';
import styled from 'styled-components';
import AuthButtonGroup from '@components/UserAuthPage/AuthButtonGroup';

const UserAuthPage: React.FC = () => {
  return (
    <Div>
      <H1>택시자버</H1>
      <div>
        <p>안녕하세요,</p>
        <p>택시를 잡으려면 로그인 해주세요.</p>
      </div>
      <AuthButtonGroup userType={'user'} />
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: space-around;
`;

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

export default UserAuthPage;
