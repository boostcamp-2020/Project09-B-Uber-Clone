import React from 'react';
import styled from 'styled-components';
import EntryButtonGroup from '@components/userDriverSelect/EntryButtonGroup';

const UserDriverSelectPage: React.FC = () => {
  return (
    <Div>
      <H1>택시자버</H1>
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
  justify-content: space-between;
  background-image: url('https://camo.githubusercontent.com/bebbca2f4237ace4ed0da7bd0b43b0e2c0b09691d6489f7251fcae7556b55f5b/68747470733a2f2f692e696d6775722e636f6d2f4c4a686d7674332e706e67');
  background-repeat: no-repeat;
  background-position: center;
  padding: 40px;
`;

const H1 = styled.h1`
  font-size: 60px;
  font-weight: 800;
  text-shadow: 3px 6px 20px #777777d4;
`;
export default UserDriverSelectPage;
