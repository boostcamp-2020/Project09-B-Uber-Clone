import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { Button } from 'antd';
import { Modal } from 'antd-mobile';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined, HistoryOutlined } from '@ant-design/icons';
import { SIGNOUT } from '@queries/signout';

interface MenuPropsType {
  type: string;
}

const MenuButton: React.FC<MenuPropsType> = ({ type }) => {
  const history = useHistory();
  const modalAlert = Modal.alert;
  const [visible, setVisible] = useState(false);

  const toggle = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const [signout] = useMutation(SIGNOUT);

  const logout = useCallback(async () => {
    const variables = { type: `${type}` };
    const {
      data: {
        signout: { success, message },
      },
    } = await signout({ variables });
    if (success) {
      alert('로그아웃 되었습니다.');
      window.location.replace(`/${type}`);
    } else alert(message);
  }, []);

  const showAlert = useCallback(() => {
    modalAlert('Logout', '로그아웃을 하시겠습니까?', [
      { text: 'Cancel', style: 'default' },
      { text: 'OK', onPress: () => logout() },
    ]);
  }, []);

  const historyHandler = () => {
    history.push('/user/history');
  };

  const bigBtnStyle = { width: '45px', height: '45px', fontSize: '23px' };
  const smallBtnStyle = { width: '40px', height: '40px', fontSize: '20px' };

  return (
    <Overlay>
      <Button type="primary" onClick={toggle} style={bigBtnStyle} shape="circle">
        {React.createElement(visible ? MenuFoldOutlined : MenuUnfoldOutlined)}
      </Button>
      <>
        {visible ? (
          <ButtonGroup>
            <Button style={smallBtnStyle} shape="circle" icon={<LogoutOutlined />} onClick={showAlert} />
            <Button style={smallBtnStyle} shape="circle" icon={<HistoryOutlined />} onClick={historyHandler} />
          </ButtonGroup>
        ) : null}
      </>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 125px;
  right: 12%;
  z-index: 1;
`;

const ButtonGroup = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100px;
  justify-content: space-evenly;
`;
export default MenuButton;
