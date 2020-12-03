import React from 'react';
import styled from 'styled-components';
import { RightOutlined } from '@ant-design/icons';

const Path: React.FC<{ startPoint: string; endPoint: string }> = ({ startPoint, endPoint }) => {
  return (
    <CenterDiv>
      <BackgroundDiv>
        <FlexDiv>
          <PointText>{startPoint}</PointText>
        </FlexDiv>
        <FlexDiv>
          <RightOutlined
            style={{
              margin: '0 10px',
              color: '#f3f3f3',
            }}
          />
        </FlexDiv>
        <FlexDiv>
          <PointText>{endPoint}</PointText>
        </FlexDiv>
      </BackgroundDiv>
    </CenterDiv>
  );
};

const CenterDiv = styled.div`
  position: absolute;
  z-index: 2;
  top: 8%;
  left: 50%;
  max-width: 50%;
  transform: translateX(-50%);
`;

const BackgroundDiv = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  border-radius: 50px;
  background-color: #181818;
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
