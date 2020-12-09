import React from 'react';
import styled from 'styled-components';

interface Props {
  startLocation: string;
}

const StartLocationInfo: React.FC<Props> = ({ startLocation }) => {
  return (
    <Div>
      <p> 출발지 </p>
      <div>{startLocation}</div>
    </Div>
  );
};

const Div = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  width: auto;
  border-radius: 6px;
  background-color: #2e2e2e;
  color: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  & p {
    margin: 0;
    min-width: 19%;
    font-size: 16px;
  }
  & div {
    overflow: scroll;
    white-space: nowrap;
    text-overflow: scroll;
    font-size: 22px;
  }
`;

export default StartLocationInfo;
