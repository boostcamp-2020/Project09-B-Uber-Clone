import React, { useState } from 'react';
import WorkingToggle from '@components/driverMain/WorkingToggle';
import DriverMainBody from '@components/driverMain/DriverMainBody';
import styled from 'styled-components';
import Menu from '@components/userMain/Menu';

const DriverMainPage: React.FC = () => {
  const [isWorking, setIsWorking] = useState(false);

  return (
    <Wrapper>
      <WorkingToggle onChange={setIsWorking} />
      <DriverMainBody isWorking={isWorking} />
      <Menu type="driver" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 4%;
  width: 100vw;
  height: 100vh;
`;

export default DriverMainPage;
