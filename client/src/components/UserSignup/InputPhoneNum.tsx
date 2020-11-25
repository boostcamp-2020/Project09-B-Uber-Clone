import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InputItem, Button, Icon } from 'antd-mobile';

interface TestProps {
  displayNo: number;
  setDisplayNext: () => void;
}

const InputPhoneNum: React.FC<TestProps> = (props) => {
  return (
    <Div style={{ display: props.displayNo === 0 ? 'flex' : 'none' }}>
      <InputGroup>
        <p>
          <img src="https://img.icons8.com/ios-filled/48/000000/phone.png" />
        </p>
        <InputItem type="phone" clear placeholder="전화번호를 입력해주세요" />
      </InputGroup>
      <Button onClick={props.setDisplayNext}>
        다음 <Icon type="right" style={{ verticalAlign: 'middle' }} />
      </Button>
    </Div>
  );
};

const InputGroup = styled.div`
  margin: 0 5%;
`;

const Div = styled.div`
  flex-direction: column;
  height: 80vh;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const H3 = styled.h3`
  font-size: 18px;
`;

export default InputPhoneNum;
