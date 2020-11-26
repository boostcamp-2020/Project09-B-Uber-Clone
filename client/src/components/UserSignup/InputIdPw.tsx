import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InputItem, Button, Icon } from 'antd-mobile';
import { InputIdPwProps } from '../../types';

const InputIdPw: React.FC<InputIdPwProps> = (props) => {
  const [id, setId] = useState('');
  const [password, setPw] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const handleChangeId = (v: any) => setId(v);
  const handleChangePw = (v: any) => setPw(v);
  useEffect(() => {
    if (id.length >= 6 && password.length >= 8) setDisabled(false);
    else setDisabled(true);
  });

  const handleClick = () => {
    console.log(props.phone, props.name, id, password);
  };
  return (
    <Div style={{ display: props.displayNo === 2 ? 'flex' : 'none' }}>
      <InputGroup>
        <p>
          <img src="https://img.icons8.com/ios-filled/48/000000/security-checked.png" />
        </p>
        <InputItem clear placeholder="아이디를 입력해주세요 (6자 이상)" value={id} onChange={handleChangeId} />
        <InputItem
          clear
          placeholder="비밀번호를 입력해주세요 (8자 이상)"
          type="password"
          value={password}
          onChange={handleChangePw}
        />
      </InputGroup>
      <Button onClick={handleClick} disabled={isDisabled}>
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
