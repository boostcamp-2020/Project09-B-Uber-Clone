import React from 'react';
import moment from 'moment';
import { Card, WhiteSpace, List } from 'antd-mobile';
import { LocationWithName } from '@custom-types';
import styled from 'styled-components';

const Item = List.Item;

const HistoryBox: React.FC<HistoryType> = ({
  startLocation,
  endLocation,
  startTime,
  endTime,
  fee,
  carModel,
  plateNumber,
}) => {
  return (
    <Wrapper>
      <Card full>
        <Card.Body>
          <List renderHeader={() => moment(startTime).format('YYYY/MM/DD')}>
            <Item extra={startLocation} wrap>
              출발
            </Item>
            <Item extra={endLocation} wrap>
              도착
            </Item>
            <Item extra={`${moment(startTime).format('HH:mm')} - ${moment(endTime).format('HH:mm')}`} wrap>
              운행 시간
            </Item>
            <Item extra={`${fee}원`}>요금</Item>
            <Item extra={`${carModel} | ${plateNumber}`} wrap>
              택시 정보
            </Item>
          </List>
        </Card.Body>
      </Card>
      <WhiteSpace size="lg" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .am-card-body {
    padding: 6px 15px;
  }
  .am-list-item {
    min-height: 0.8rem !important;
    div {
      font-size: 0.9rem !important;
      border-bottom: none !important;
    }
    .am-list-content {
      flex: 1 0 !important;
      color: gray;
    }
    .am-list-extra {
      flex: 2 1 !important;
      color: black;
      text-align: left;
    }
  }
`;

interface HistoryType {
  startLocation: LocationWithName;
  endLocation: LocationWithName;
  startTime: Date;
  endTime: Date;
  fee: number;
  carModel: string;
  plateNumber: string;
}

export default HistoryBox;
