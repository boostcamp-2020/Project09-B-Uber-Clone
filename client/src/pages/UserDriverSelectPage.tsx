import React from 'react';
import styled from 'styled-components';
import EntryButtonGroup from '@components/UserDriverSelect/EntryButtonGroup';

const UserDriverSelectPage: React.FC = () => {
  return (
    <Div>
      <H1>자버택시</H1>
      <EntryButtonGroup />
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  border: 1px solid;
  justify-content: space-around;
`;

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;
export default UserDriverSelectPage;
