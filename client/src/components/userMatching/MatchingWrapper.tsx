import React from 'react';
import styled from 'styled-components';
import Matching from './Matching';
import MatchingCancelButton from './MatchingCancelButton';

const MatchingWrapper: React.FC<{ onClickHandler: () => void }> = ({ onClickHandler }) => {
  return (
    <CenterDiv>
      <ColumnDiv>
        <Matching />
        <MatchingCancelButton onClickHandler={onClickHandler} />
      </ColumnDiv>
    </CenterDiv>
  );
};

const CenterDiv = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default MatchingWrapper;
