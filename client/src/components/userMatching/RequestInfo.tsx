import React from 'react';
import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';

const Path: React.FC<{ startPoint: string; endPoint: string }> = ({ startPoint, endPoint }) => {
  return (
    <CenterDiv>
      <PointTextDiv>
        <PointText>{startPoint}</PointText>
      </PointTextDiv>
      <FlexDiv>
        <DownOutlined
          style={{
            margin: '8px',
            color: '#f3f3f3',
          }}
        />
      </FlexDiv>
      <PointTextDiv>
        <PointText>{endPoint}</PointText>
      </PointTextDiv>
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
  padding: 8px 32px;
  border-radius: 50px;
  background-color: #2e2e2e;
`;

const PointText = styled.div`
  word-break: break-word;
  line-break: anywhere;
  color: #f3f3f3;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 45%;
`;

const PointTextDiv = styled(FlexDiv)`
  flex: 2;
  width: max-content;
  text-align: center;
  line-height: 1rem;
`;

export default Path;
