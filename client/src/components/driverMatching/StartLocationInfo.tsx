import React from 'react';
import styled from 'styled-components';

interface Props {
  startLocation: string;
}

const StartLocationInfo: React.FC<Props> = ({ startLocation }) => {
  return (
    <Div>
      <p>승객 출발지 : {startLocation}</p>
    </Div>
  );
};

const Div = styled.div`
  margin: 10px;
  width: auto;
  border-radius: 6px;
  background-color: #cccccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
`;

export default StartLocationInfo;
