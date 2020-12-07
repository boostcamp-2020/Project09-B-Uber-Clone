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
  const [foldable, setFoldable] = useState(true);

  const toggle = useCallback(() => {
    setFoldable(!foldable);
  }, [foldable]);

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
      <Button type="primary" onClick={toggle} style={{ marginBottom: 16 }}>
        {React.createElement(foldable ? MenuFoldOutlined : MenuUnfoldOutlined)}
      </Button>
      <Menu mode="inline" inlineCollapsed={foldable}>
        <Menu.Item key="1" icon={<LogoutOutlined />} onClick={logout}>
          로그아웃
        </Menu.Item>
        <Menu.Item key="2" icon={<HistoryOutlined />} onClick={historyHandler}>
          이용 내역
        </Menu.Item>
      </Menu>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: 200px;
  left: 0px;
  z-index: 999;
`;

export default MenuButton;
