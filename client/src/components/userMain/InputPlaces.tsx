import React from 'react';
import dataDiv from '../userMain/DataDiv';
import PlaceDropdown from '../userMain/PlaceDropdown';
import styled from 'styled-components';

const InputPlaces: React.FC = () => {
  const Dropdown = () => {
    return (
      <>
        <Div>
          <p>출발</p>
          <WrapDropdown>
            <PlaceDropdown type={'start'} />
          </WrapDropdown>
        </Div>
        <Div>
          <p>도착</p>
          <WrapDropdown>
            <PlaceDropdown type={'end'} />
          </WrapDropdown>
        </Div>
      </>
    );
  };

  const DataCompo = dataDiv(Dropdown);
  return <DataCompo putOn="top" />;
};

const Div = styled.div`
  display: flex;
  justify-content: center;
  color: #181818;
  font-weight: 300;
`;

const WrapDropdown = styled.div`
  width: 80%;
  margin-left: 10px;
`;

export default InputPlaces;
