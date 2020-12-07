import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd-mobile';

const Menu: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    if (visible) setVisible(false);
    else setVisible(true);
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
          <Button type="primary" size="small">
            로그아웃
          </Button>
          <p />
          <Button type="primary" size="small">
            이용 내역
          </Button>
        </SubOverlay>
      ) : null}
    </>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: 100px;
  right: 0;
  margin: 10px;
`;

const SubOverlay = styled.div`
  position: absolute;
  top: 140px;
  right: 0;
  margin: 10px;
  & .am-button {
    margin: 0;
  }
`;
export default Menu;
