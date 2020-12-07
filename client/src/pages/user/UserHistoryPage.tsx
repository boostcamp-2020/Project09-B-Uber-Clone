import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import HistoryBox from '@components/userHistory/HistoryBox';
import { GET_USER_HISTORY } from '@queries/user/userHistory';
import styled from 'styled-components';
import { Button } from 'antd';
import { HomeFilled } from '@ant-design/icons';

const UserHistoryPage: React.FC = () => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const { loading, data } = useQuery(GET_USER_HISTORY, { variables: { page } });

  if (loading || !data) return <>로딩중</>;
  return (
    <Wrapper>
      <Title>택시자버 이용내역</Title>
      {data.userHistory.map(({ id, request, ...info }: any) => (
        <HistoryBox key={id} {...request} {...info} />
      ))}
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

export default UserHistoryPage;
