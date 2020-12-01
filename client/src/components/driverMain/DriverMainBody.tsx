import React, { useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import getLocation from '@utils/getLocation';
import styled from 'styled-components';
import DriverWorkingContent from './DriverWorkingContent';

const START_SERVICE = gql`
  mutation {
    startService {
      success
      message
    }
  }
`;
const STOP_SERVICE = gql`
  mutation {
    stopService {
      success
      message
    }
  }
`;
const UPDATE_LOCATION = gql`
  mutation UpdateDriverLocation($location: LatLngInput) {
    updateDriverLocation(location: $location) {
      success
      message
    }
  }
`;

const DriverMainBody: React.FC<{ isWorking: boolean }> = ({ isWorking }) => {
  const [updateDriverLocation] = useMutation(UPDATE_LOCATION);
  const [startService] = useMutation(START_SERVICE);
  const [stopService] = useMutation(STOP_SERVICE);

  useEffect(() => {
    if (isWorking) {
      startService();
      const updateLocation = setInterval(async () => {
        const location = await getLocation();
        updateDriverLocation({ variables: { location } });
      }, 2000);
      return () => {
        clearInterval(updateLocation);
        stopService();
      };
    }
  }, [isWorking]);

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
