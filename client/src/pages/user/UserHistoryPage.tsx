import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import HistoryBox from '@components/userHistory/HistoryBox';
import { GET_USER_HISTORY } from '@queries/user/userHistory';
import styled from 'styled-components';
import { Button } from 'antd';
import { ActivityIndicator } from 'antd-mobile';
import { HomeFilled } from '@ant-design/icons';

const RESULT_PER_PAGE = 10;

const UserHistoryPage: React.FC = () => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [buttonDisabled, setButtonDisabled] = useState({ prev: true, next: false });
  const [showingHistory, setShowingHistory] = useState([]);
  const { loading, data } = useQuery(GET_USER_HISTORY, { variables: { page: page }, fetchPolicy: 'network-only' });

  const onPrev = useCallback(() => {
    setPage(page - 1);
    if (page === 2) setButtonDisabled({ prev: true, next: false });
    else setButtonDisabled({ ...buttonDisabled, next: false });
  }, [page, buttonDisabled]);

  const onNext = useCallback(() => {
    setPage(page + 1);
    setButtonDisabled({ ...buttonDisabled, prev: false });
  }, [page, buttonDisabled]);

  useEffect(() => {
    if (data?.userHistory.length) {
      setShowingHistory(data.userHistory);
      if (data.userHistory.length < RESULT_PER_PAGE) setButtonDisabled({ ...buttonDisabled, next: true });
    } else if (data?.userHistory.length === 0) {
      setPage(page - 1);
      setButtonDisabled({ ...buttonDisabled, next: true });
    }
  }, [data]);

  if (loading)
    return (
      <LoadingWrapper>
        <ActivityIndicator animating text="로딩 중입니다" />
      </LoadingWrapper>
    );

  return (
    <Wrapper>
      <Title>택시자버 이용내역</Title>
      {showingHistory.length ? (
        showingHistory.map(({ id, request, ...info }: any) => <HistoryBox key={id} {...request} {...info} />)
      ) : (
        <NoHistory>이용내역이 없습니다</NoHistory>
      )}
      <PaginationButtonGrup>
        <Button disabled={buttonDisabled.prev} onClick={onPrev}>
          최근내역
        </Button>
        <Button disabled={buttonDisabled.next} onClick={onNext}>
          이전내역
        </Button>
      </PaginationButtonGrup>
      <Button
        shape="circle"
        icon={<HomeFilled />}
        size="large"
        type="primary"
        style={{ position: 'fixed', bottom: '0', right: '0', margin: '25px' }}
        onClick={() => {
          history.push('/user/map');
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

const Title = styled.h1`
  margin: 25px 0 10px 25px;
`;

const PaginationButtonGrup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px 0 30px;

  > button {
    margin: 0 20px;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const NoHistory = styled.h2`
  text-align: center;
  padding: 50px 0;
`;

export default UserHistoryPage;
