import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { InputItem, Button, Icon, Modal } from 'antd-mobile';
import { InputIdPwProps } from '@custom-types';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { ADD_USER } from '@queries/user/userSignup';

const InputIdPw: React.FC<InputIdPwProps> = (props) => {
  const history = useHistory();
  const [id, setId] = useState('');
  const [password, setPw] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const [modalStatus, setModalStatus] = useState({ visible: false, message: '' });
  const handleChangeId = useCallback((v: string) => setId(v), []);
  const handleChangePw = useCallback((v: string) => setPw(v), []);
  const showAlert = useCallback((message: string) => setModalStatus({ visible: true, message }), []);
  const closeAlert = useCallback(() => setModalStatus({ visible: false, message: '' }), []);
  useEffect(() => {
    if (id.length >= 6 && password.length >= 8) setDisabled(false);
    else setDisabled(true);
  });
  const [addUser] = useMutation(ADD_USER);

  const handleSubmit = async () => {
    const [phone, name] = [props.phone, props.name];
    const variables = { id, password, name, phone };
    try {
      const {
        data: {
          userSignup: { success, message },
        },
      } = await addUser({
        variables,
      });
      if (success) history.push('/user/map');
      else showAlert(message);
    } catch (e) {
      showAlert(`오류가 발생했습니다, ${e}`);
    }
  };

  return (
    <>
      <Div style={{ display: props.page === 2 ? 'flex' : 'none' }}>
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
        <Button onClick={handleSubmit} disabled={isDisabled}>
          회원가입 완료 <Icon type="check" style={{ verticalAlign: 'middle' }} />
        </Button>
      </Div>
      <Modal
        visible={modalStatus.visible}
        transparent
        onClose={closeAlert}
        title={modalStatus.message}
        footer={[
          {
            text: '확인',
            onPress: closeAlert,
          },
        ]}
      ></Modal>
    </>
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
