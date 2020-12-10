import React, { useEffect, useState, useCallback } from 'react';
import { useSubscription, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDriverMatchingInfo } from '@stores/modules/driverMatchingInfo';
import styled from 'styled-components';
import { Button, Toast } from 'antd-mobile';
import { Progress } from 'antd';
import { NEW_REQUEST, ACCEPT_REQUEST } from '@queries/driver/driverMain';
import { ArrowDownOutlined } from '@ant-design/icons';

const DriverWorkingContent: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [requestQueue, setRequestQueue]: any = useState([]);
  const [currentRequest, setCurrentRequest]: any = useState(undefined);
  const [timers, setTimers] = useState({ percentInterval: 0, requestTimeout: 0 });
  const [progressPercent, setProgressPercent] = useState(0);
  const [acceptRequest] = useMutation(ACCEPT_REQUEST);
  const { data, error } = useSubscription(NEW_REQUEST);

  const clearCurrentStatus = useCallback(() => {
    clearInterval(timers.percentInterval);
    clearTimeout(timers.requestTimeout);
    setProgressPercent(0);
  }, [timers]);

  const onAccept = useCallback(async () => {
    const { uid, request, tel } = currentRequest;
    const {
      data: {
        approveMatching: { success, message },
      },
    } = await acceptRequest({ variables: { uid } });
    if (!success) {
      Toast.show(message);
      onReject();
    } else {
      dispatch(setDriverMatchingInfo({ uid, request, tel }));
      clearCurrentStatus();
      history.push('/driver/map');
    }
  }, [currentRequest, clearCurrentStatus]);
  const onReject = useCallback(() => {
    setCurrentRequest(undefined);
  }, []);

  const changeCurrentRequest = useCallback(
    (newIndex: number) => {
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
    },
    [requestQueue],
  );

  useEffect(() => {
    if (data?.driverServiceSub) setRequestQueue([...requestQueue, data.driverServiceSub]);
    if (error) location.reload();
  }, [data, error]);

  useEffect(() => {
    if (!currentRequest && requestQueue.length) {
      const nextIndex = requestQueue.findIndex((req: any) => new Date(parseInt(req.expirationTime, 10)) > new Date());
      changeCurrentRequest(nextIndex);
      setRequestQueue(requestQueue.filter((_: any, index: number): boolean => index > nextIndex));
    }
    if (!currentRequest) return clearCurrentStatus;
  }, [currentRequest, requestQueue]);

  return (
    <>
      <ContentWrapper>
        {currentRequest ? (
          <RequestWrapper>
            <RequestDisplay>
              <p>{currentRequest.request.startLocation.name}</p>
              <ArrowDownOutlined style={{ fontSize: '3rem' }} />
              <p>{currentRequest.request.endLocation.name}</p>
            </RequestDisplay>
            <BottomLayout>
              {currentRequest && <Progress percent={progressPercent} showInfo={false} style={{ width: '100%' }} />}
              <ButtonGroup>
                <Button type="primary" onClick={onAccept}>
                  수락하기
                </Button>
                <Button onClick={onReject} style={{ backgroundColor: 'rgba(120,120,120,0.4)' }}>
                  거절하기
                </Button>
              </ButtonGroup>
            </BottomLayout>
          </RequestWrapper>
        ) : (
          <WaitingRequest>콜 대기중</WaitingRequest>
        )}
      </ContentWrapper>
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
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const RequestDisplay = styled.div`
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

const BottomLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  bottom: 0;
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
