import React from 'react';
import styled from 'styled-components';
import ContentWrapper from '@components/common/ContentWrapper';
import Taxi from '@components/common/Taxi';
import { TaxiData } from '@custom-types';

interface Props {
  taxiInfo: TaxiData;
}

const MatchedDriverData: React.FC<Props> = ({ taxiInfo }) => {
  const { carModel, carColor, plateNumber } = taxiInfo;
  const matchedDriverData = () => {
    return (
      <>
        <H2>승차 전 차량 정보를 확인하세요</H2>
        <Container>
          <Taxi size="60" />
          <InnerContainer>
            <Div>
              <Pt>차종</Pt>
              <P>{carModel}</P>
            </Div>
            <Div>
              <Pt>차량 색</Pt>
              <P>{carColor}</P>
            </Div>
            <Div>
              <Pt>차 번호</Pt>
              <P>{plateNumber}</P>
            </Div>
          </InnerContainer>
        </Container>
      </>
    );
  };

  const MatchedDriverDataComponent = ContentWrapper(matchedDriverData);
  return <MatchedDriverDataComponent putOn="bottom" />;
};

const H2 = styled.h2`
  font-weight: 600;
  font-size: 16px;
  align-self: center;
`;

const Flex = styled.div`
  display: flex;
`;

const Container = styled(Flex)`
  justify-content: space-around;
  align-items: center;
`;

const InnerContainer = styled(Flex)`
  flex-direction: column;
  flex: 1;
  width: 55%;
  align-items: none;
`;

const Div = styled(Flex)`
  height: 30px;
  align-items: center;
  justify-content: space-between;
`;

const Pt = styled.p`
  width: 30%;
  font-size: 12px;
  font-weight: 300px;
`;
const P = styled.p`
  font-size: 14px;
`;

export default MatchedDriverData;
