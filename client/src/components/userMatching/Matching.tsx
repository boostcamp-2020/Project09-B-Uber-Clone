import React from 'react';
import styled from 'styled-components';
import Loading from '@components/common/Loading';

const Matching: React.FC = () => {
  return (
    <div>
      <CenterDiv>
        <BackgroundDiv>
          <Loading size={20} />
          <TextWrap>드라이버를 찾는 중입니다..</TextWrap>
        </BackgroundDiv>
      </CenterDiv>
    </div>
  );
};

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const BackgroundDiv = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px 25px;
  border-radius: 50px;
  background-color: #e4e4e4;
`;

const TextWrap = styled.span`
  margin-left: 15px;
`;

export default Matching;
