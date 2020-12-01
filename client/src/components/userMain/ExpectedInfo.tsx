import React from 'react';
import styled from 'styled-components';
import { Flex, WhiteSpace } from 'antd-mobile';

interface ExpectedInfoPropsType {
  name: string;
  value: string;
}

const ExpectedInfo: React.FC<ExpectedInfoPropsType> = ({ name, value }) => {
  return (
    <FlexBox>
      <Flex.Item style={{ fontWeight: 'bold' }}>{name}</Flex.Item>
      <Flex.Item>{value}</Flex.Item>
    </FlexBox>
  );
};

const FlexBox = styled.div`
  display: flex;
  font-size: 20px;
`;

export default ExpectedInfo;
