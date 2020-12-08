import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { Menu, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined, HistoryOutlined } from '@ant-design/icons';
import { SIGNOUT } from '@queries/signout';

interface MenuPropsType {
  type: string;
}

const MenuButton: React.FC<MenuPropsType> = ({ type }) => {
  const history = useHistory();
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

  const historyHandler = () => {
    history.push('/user/history');
  };

  return (
    <Overlay>
      <Button type="primary" onClick={toggle} style={{ marginBottom: 16 }} shape="circle">
        {React.createElement(visible ? MenuFoldOutlined : MenuUnfoldOutlined)}
      </Button>
      <>
        {visible ? (
          <Menu mode="inline" inlineCollapsed={visible}>
            <Menu.Item key="1" icon={<LogoutOutlined />} onClick={logout} />
            <Menu.Item key="2" icon={<HistoryOutlined />} onClick={historyHandler} />
          </Menu>
        ) : null}
      </>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: 200px;
  left: 10px;
  z-index: 999;
`;

export default MenuButton;
