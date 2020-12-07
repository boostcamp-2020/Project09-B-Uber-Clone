import React, { useState } from 'react';
import styled from 'styled-components';
import { Toast } from 'antd-mobile';
import { useMutation, gql } from '@apollo/client';
import { Menu, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined, HistoryOutlined } from '@ant-design/icons';

interface MenuPropsType {
  type: string;
}
const SIGNOUT = gql`
  mutation Signout($type: String!) {
    signout(type: $type) {
      success
      message
    }
  }
`;

const MenuButton: React.FC<MenuPropsType> = ({ type }) => {
  const [foldable, setFoldable] = useState(true);

  const toggle = () => {
    setFoldable(!foldable);
  };

  const [signout] = useMutation(SIGNOUT);

  const logout = async () => {
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
  };

  const historyHandler = () => {
    Toast.show('개발 중입니다. 🙏', Toast.SHORT);
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
