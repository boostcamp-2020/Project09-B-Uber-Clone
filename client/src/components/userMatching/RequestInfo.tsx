import React from 'react';
import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';

const Path: React.FC<{ startPoint: string; endPoint: string }> = ({ startPoint, endPoint }) => {
  return (
    <CenterDiv>
      <FlexDiv>
        <PointText>{startPoint}</PointText>
      </FlexDiv>
      <FlexDiv>
        <DownOutlined
          style={{
            margin: '8px',
            color: '#f3f3f3',
          }}
        />
      </FlexDiv>
      <FlexDiv>
        <PointText>{endPoint}</PointText>
      </FlexDiv>
    </CenterDiv>
  );
};

const CenterDiv = styled.div`
  position: absolute;
  z-index: 2;
  top: 8%;
  left: 50%;
  width: 90%;
  transform: translateX(-50%);
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  border-radius: 50px;
  background-color: #2e2e2e;
`;

const PointText = styled.div`
  color: #f3f3f3;
`;

const FlexDiv = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default Path;
