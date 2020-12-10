import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import getLocation from '@utils/getLocation';
import styled from 'styled-components';
import { START_SERVICE, STOP_SERVICE, UPDATE_LOCATION } from '@queries/driver/driverMain';
import { ActivityIndicator, Toast } from 'antd-mobile';
import DriverWorkingContent from './DriverWorkingContent';

const DriverMainBody: React.FC<{ isWaiting: boolean }> = ({ isWaiting }) => {
  const history = useHistory();
  const [updateDriverLocation] = useMutation(UPDATE_LOCATION);
  const [startService, { loading: updateStartServiceLoading, error: updateStartServiceError }] = useMutation(
    START_SERVICE,
  );
  const [stopService, { loading: updateStopServiceLoading, error: updateStopServiceError }] = useMutation(STOP_SERVICE);

  useEffect(() => {
    if (updateStartServiceError || updateStopServiceError)
      Toast.fail('오류가 발생했습니다. 드라이버 로그인 페이지로 이동합니다.', 3, () => {
        history.push('/driver');
      });
  }, [updateStartServiceError, updateStopServiceError]);

  useEffect(() => {
    if (isWaiting) {
      startService();
      const updateLocation = setInterval(async () => {
        const location = await getLocation();
        updateDriverLocation({ variables: { location } });
      }, 2000);
      return () => {
        clearInterval(updateLocation);
        (async () => {
          try {
            await stopService();
          } catch (error) {
            console.log(error);
          }
        })();
      };
    }
  }, [isWaiting]);

  return (
    <Wrapper>
      {(updateStartServiceLoading || updateStopServiceLoading) && <ActivityIndicator toast text="로딩중..." />}
      <>{isWaiting ? <DriverWorkingContent /> : <WorkingFinished>영업종료</WorkingFinished>}</>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px 50px;
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
