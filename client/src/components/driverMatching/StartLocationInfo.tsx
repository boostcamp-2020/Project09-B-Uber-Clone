import React from 'react';
import styled from 'styled-components';
import { NoticeBar } from 'antd-mobile';

interface Props {
  startLocation: string;
}

const StartLocationInfo: React.FC<Props> = ({ startLocation }) => {
  return (
    <Div>
      <Left>
        <p> 출발지 </p>
        <Vertical>.</Vertical>
      </Left>
      <Right>
        <NoticeBar
          icon={null}
          marqueeProps={{
            loop: true,
            style: { padding: '0 50px', fontSize: '22px' },
          }}
        >
          {startLocation}
        </NoticeBar>
      </Right>
    </Div>
  );
};
const Right = styled.div`
  width: 74%;
  display: flex;
  justify-content: center;
`;
const Left = styled.div`
  width: 25%;
  display: flex;
  justify-content: flex-end;
`;
const Vertical = styled.div`
  width: 1px;
  background-color: #ffff;
  height: 100%;
  float: left;
  border: 1px ridge #ffff;
  margin-left: 10%;
`;

const Div = styled.div`
  margin-bottom: 10px;
  width: 100%;
  border-radius: 6px;
  background-color: #2e2e2e;
  color: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  height: 47px;
  & p {
    margin: 0 5px 5px 0;
    min-width: 19%;
    font-size: 16px;
  }
  & div {
    overflow: scroll;
    white-space: nowrap;
    text-overflow: scroll;
    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export default StartLocationInfo;
