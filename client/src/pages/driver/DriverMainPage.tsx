import React, { useState, useEffect } from 'react';
import WorkingToggle from '@components/driverMain/WorkingToggle';
import DriverMainBody from '@components/driverMain/DriverMainBody';
import styled from 'styled-components';
import Menu from '@components/common/Menu';
import { CHECK_IS_WAITING } from '@queries/driver/driverMatching';
import { useQuery } from '@apollo/client';
import Loading from '@components/common/Loading';

const DriverMainPage: React.FC = () => {
  const { loading, error, data } = useQuery(CHECK_IS_WAITING);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (!loading && data) setIsWaiting(data.isDriverWaiting);
  }, [loading, data]);

  return loading ? (
    <Loading />
  ) : (
    <Wrapper>
      <WorkingToggle onChange={setIsWaiting} checked={isWaiting} />
      <DriverMainBody isWaiting={isWaiting} />
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
