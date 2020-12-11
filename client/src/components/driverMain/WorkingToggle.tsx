import React from 'react';
import { Switch } from 'antd';
import styled from 'styled-components';

const WorkingToggle: React.FC<{ onChange: (checked: boolean, event: Event) => void; checked: boolean }> = ({
  onChange,
  checked,
}) => {
  return (
    <Wrapper>
      <Switch
        checked={checked}
        onChange={onChange}
        style={{ height: '70px', width: '85%', borderRadius: '20px' }}
        checkedChildren="영업 종료하기"
        unCheckedChildren="영업 시작하기"
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 30px 0;

  .ant-switch-handle {
    top: 0;
    width: 50%;
    height: 100%;
    left: 0;
  }
  .ant-switch-checked .ant-switch-handle {
    left: calc(50%);
  }
  .ant-switch-handle::before {
    border-radius: 20px;
  }
  .ant-switch-inner {
    margin-left: 50%;
    font-size: 0.9rem;
    font-weight: bold;
    color: black;
  }
  .ant-switch-checked .ant-switch-inner {
    margin-left: 0;
    margin-right: 50%;
    color: white;
  }
`;

export default WorkingToggle;
