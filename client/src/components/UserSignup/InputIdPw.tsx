import React, { useEffect } from 'react';
import styled from 'styled-components';
import { List, InputItem, Button, Icon } from 'antd-mobile';

const InputIdPw: React.FC = () => {
  return (
    <Div style={{ display: 'none' }}>
      <InputGroup>
        <p>
          <img src="https://img.icons8.com/ios-filled/48/000000/security-checked.png" />
        </p>
        <InputItem clear placeholder="아이디를 입력해주세요" />
        <InputItem clear placeholder="비밀번호를 입력해주세요" type="password" />
      </InputGroup>
      <Button>
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

export default InputIdPw;
