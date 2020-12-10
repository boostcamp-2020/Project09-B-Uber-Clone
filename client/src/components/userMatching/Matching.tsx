import React from 'react';
import styled from 'styled-components';
import Loading from '@components/common/Loading';

const Matching: React.FC = () => {
  return (
    <BackgroundDiv>
      <Loading size={20} color={'#f3f3f3'} />
      <TextWrap>드라이버를 찾는 중입니다..</TextWrap>
    </BackgroundDiv>
  );
};

const BackgroundDiv = styled.div`
  margin: 15px 0;
  width: 65%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px 25px;
  border-radius: 50px;
  background-color: #95a5a6;
`;

const TextWrap = styled.span`
  color: #f3f3f3;
  margin-left: 10px;
`;

export default Matching;
