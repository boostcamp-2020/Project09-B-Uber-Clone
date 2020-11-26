import React, { useState } from 'react';
import styled from 'styled-components';
import { InputItem, Button, Icon } from 'antd-mobile';

interface Props {
  displayNo: number;
  setDisplayNext: () => void;
}

const InputIdPw: React.FC<Props> = (props) => {
  const [id, setId] = useState('');
  const [password, setPw] = useState('');

  const handleChangeId = (v: any) => setId(v);
  const handleChangePw = (v: any) => setPw(v);

  return (
    <Div style={{ display: props.displayNo === 2 ? 'flex' : 'none' }}>
      <InputGroup>
        <p>
          <img src="https://img.icons8.com/ios-filled/48/000000/security-checked.png" />
        </p>
        <InputItem clear placeholder="아이디를 입력해주세요" value={id} onChange={handleChangeId} />
        <InputItem
          clear
          placeholder="비밀번호를 입력해주세요"
          type="password"
          value={password}
          onChange={handleChangePw}
        />
      </InputGroup>
      <Button>
        회원가입 완료 <Icon type="check" style={{ verticalAlign: 'middle' }} />
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
