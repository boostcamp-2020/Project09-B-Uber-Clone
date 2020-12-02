import React, { useEffect, useState } from 'react';
import { useSubscription, useMutation } from '@apollo/client';
import styled from 'styled-components';
import { Button } from 'antd-mobile';
import { Progress } from 'antd';
import { NEW_REQUEST, ACCEPT_REQUEST } from '../../queries/driver/driverMain';
import { ArrowDownOutlined } from '@ant-design/icons';

const DriverWorkingContent: React.FC = () => {
  const [requestQueue, setRequestQueue]: any = useState([]);
  const [currentRequest, setCurrentRequest]: any = useState(undefined);
  const [timers, setTimers] = useState({ percentInterval: 0, requestTimeout: 0 });
  const [progressPercent, setProgressPercent] = useState(0);
  const [acceptRequest] = useMutation(ACCEPT_REQUEST);
  const { data, error } = useSubscription(NEW_REQUEST);

  const onAccept = () => {
    acceptRequest({ variables: currentRequest.uid });
  };
  const onReject = () => {
    setCurrentRequest(undefined);
  };
  const changeCurrentRequest = (newIndex: number) => {
    const newRequest = requestQueue[newIndex];
    setCurrentRequest(newRequest);
    const expire = parseInt(newRequest.expirationTime, 10);
    const percentInterval = setInterval(() => {
      setProgressPercent(100 - (expire - new Date().getTime()) / 100);
    }, 100);
    const requestTimeout = setTimeout(() => {
      setCurrentRequest(undefined);
    }, expire - new Date().getTime());
    setTimers({ percentInterval, requestTimeout });
  };

  useEffect(() => {
    if (error) location.reload();
  }, [error]);

  useEffect(() => {
    if (data?.driverServiceSub) setRequestQueue([...requestQueue, data.driverServiceSub]);
  }, [data]);

  useEffect(() => {
    if (!currentRequest && requestQueue.length) {
      const nextIndex = requestQueue.findIndex((req: any) => new Date(parseInt(req.expirationTime, 10)) > new Date());
      changeCurrentRequest(nextIndex);
      setRequestQueue(requestQueue.filter((_: any, index: number): boolean => index > nextIndex));
    }
    if (!currentRequest)
      return () => {
        clearInterval(timers.percentInterval);
        clearTimeout(timers.requestTimeout);
        setProgressPercent(0);
      };
  }, [currentRequest, requestQueue]);

  return (
    <>
      <ContentWrapper>
        {currentRequest ? (
          <RequestWrapper>
            <p>{currentRequest.request.startLocation.name}</p>
            <ArrowDownOutlined style={{ fontSize: '3rem' }} />
            <p>{currentRequest.request.endLocation.name}</p>
          </RequestWrapper>
        ) : (
          <WaitingRequest>콜 대기중</WaitingRequest>
        )}
      </ContentWrapper>
      {currentRequest && <Progress percent={progressPercent} showInfo={false} style={{ width: '100%' }} />}
      <ButtonGroup>
        <Button type="primary" onClick={onAccept}>
          수락하기
        </Button>
        <Button onClick={onReject} style={{ backgroundColor: 'rgba(120,120,120,0.4)' }}>
          거절하기
        </Button>
      </ButtonGroup>
    </>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const RequestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  > p {
    margin: 1.5rem 0;
    font-size: 3rem;
  }
`;

const WaitingRequest = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  > a {
    width: 45%;
  }
`;

export default DriverWorkingContent;
