import React from 'react';
import styled from 'styled-components';
import ContentWrapper from '../common/ContentWrapper';
import RequestButton from './RequsetButton';

interface PreRequestDataPropsType {
  time: string;
  fee: number;
}

const PreRequestData: React.FC<PreRequestDataPropsType> = ({ time, fee }) => {
  const preReqData = () => {
    return (
      <>
        <Div>
          <p>예상시간</p>
          <P>{time}</P>
        </Div>
        <Div>
          <p>예상요금</p>
          <P>{fee}원</P>
        </Div>
        <hr />
        <RequestButton />
      </>
    );
  };

  const PreRequestDataComponent = ContentWrapper(preReqData);
  return <PreRequestDataComponent putOn="bottom" />;
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

export default PreRequestData;
