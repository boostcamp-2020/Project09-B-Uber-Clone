import React from 'react';
import styled from 'styled-components';
import DriverWorkingContent from './DriverWorkingContent';

const DriverMainBody: React.FC<{ isWorking: boolean }> = ({ isWorking }) => {
  return <Wrapper>{isWorking ? <DriverWorkingContent /> : <WorkingFinished>영업종료</WorkingFinished>}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
`;

const WorkingFinished = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 3rem;
`;

export default DriverMainBody;
