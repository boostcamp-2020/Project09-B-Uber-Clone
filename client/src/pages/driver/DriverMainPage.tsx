import React, { useState } from 'react';
import WorkingToggle from '@components/driverMain/WorkingToggle';
import DriverMainBody from '@components/driverMain/DriverMainBody';
import styled from 'styled-components';

const DriverMainPage: React.FC = () => {
  const [isWorking, setIsWorking] = useState(false);

  return (
    <Wrapper>
      <WorkingToggle onChange={setIsWorking} />
      <DriverMainBody isWorking={isWorking} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4%;
`;

export default DriverMainPage;
