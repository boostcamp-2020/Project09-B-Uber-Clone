import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd-mobile';
import { useMutation, gql } from '@apollo/client';

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

const Menu: React.FC<MenuPropsType> = ({ type }) => {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    if (visible) setVisible(false);
    else setVisible(true);
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
    alert('개발 중입니다. 🙏');
  };

  return (
    <>
      <Overlay>
        <Button
          size="small"
          style={{ backgroundColor: '#fbbc04', margin: 0 }}
          icon={<img src="https://img.icons8.com/ios/344/menu--v2.png" />}
          onClick={() => toggle()}
        />
      </Overlay>
      {visible ? (
        <SubOverlay>
          <Button type="primary" size="small" onClick={logout}>
            로그아웃
          </Button>
          <p />
          <Button type="primary" size="small" onClick={historyHandler}>
            이용 내역
          </Button>
        </SubOverlay>
      ) : null}
    </>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: 130px;
  right: 0;
  margin: 10px;
  & .am-button > .am-button-icon {
    margin: 0;
  }
`;

const SubOverlay = styled.div`
  position: absolute;
  top: 170px;
  right: 0;
  margin: 10px;
`;
export default Menu;
