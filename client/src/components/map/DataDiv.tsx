import React from 'react';
import styled from 'styled-components';

interface Props {
  putOn: string;
}

function DataDiv(Child: React.FC) {
  return (props: Props) => (
    <Div putOnDevice={props.putOn}>
      <ChildContainer>
        <Child />
      </ChildContainer>
    </Div>
  );
}

const Div = styled.div<{ putOnDevice: string }>`
  position: fixed;
  z-index: 2;
  ${(props) => props.putOnDevice}: -10px;
  width: 100%;
  display: flex;
  justify-content: center;
  height: fit-content;
  border: 1px solid #f3f3f3;
  border-radius: 10px;
  padding: ${(props) => (props.putOnDevice === 'top' ? '20px 0 10px 0' : '10px 0 20px 0')};
  background-color: #ffffff;
  box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.4);
`;

const ChildContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  border: 1px #181818 solid;
`;
export default DataDiv;
