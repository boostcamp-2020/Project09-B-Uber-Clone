import React from 'react';
import styled from 'styled-components';
import dataDiv from '../userMain/DataDiv';
import RequestButton from './RequsetButton';

// TODO : 입시값입니다 - 데이터 받아오면 지워주세요
const preCalTime = 20;
const preCalCost = '15,000';

const PreReqData: React.FC = () => {
  const preReqData = () => {
    return (
      <>
        <Div>
          <p>예상시간</p>
          <P>{preCalTime}분</P>
        </Div>
        <Div>
          <p>예상요금</p>
          <P>{preCalCost}원</P>
        </Div>
        <hr />
        <RequestButton />
      </>
    );
  };

  const PreReqDataCompo = dataDiv(preReqData);
  return <PreReqDataCompo putOn="bottom" />;
};

const Div = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 20px;
`;

export default PreReqData;
