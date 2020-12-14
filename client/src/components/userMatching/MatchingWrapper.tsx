import React from 'react';
import styled from 'styled-components';
import Matching from './Matching';
import MatchingCancelButton from './MatchingCancelButton';

const MatchingWrapper: React.FC<{ cancelMatching: () => Promise<void> }> = ({ cancelMatching }) => {
  return (
    <CenterDiv>
      <ColumnDiv>
        <Matching />
        <MatchingCancelButton cancelMatching={cancelMatching} />
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
