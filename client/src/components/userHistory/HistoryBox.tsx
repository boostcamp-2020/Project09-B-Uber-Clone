import React, { useCallback } from 'react';
import moment from 'moment';
import { Card, List } from 'antd-mobile';
import { LocationWithName } from '@custom-types';
import styled from 'styled-components';

const Item = List.Item;

const HistoryBox: React.FC<HistoryType> = ({
  startLocation,
  endLocation,
  startTime,
  // endTime,
  fee,
  carModel,
  plateNumber,
}) => {
  const formatStartDate = useCallback(() => moment(startTime).format('YYYY/MM/DD'), [startTime]);

  return (
    <Wrapper>
      <Card full>
        <Card.Body>
          <List renderHeader={formatStartDate}>
            <Item extra={startLocation.name} wrap>
              출발
            </Item>
            <Item extra={endLocation.name} wrap>
              도착
            </Item>
            {/* <Item extra={`${moment(startTime).format('HH:mm')} - ${moment(endTime).format('HH:mm')}`} wrap>
              운행 시간
            </Item> */}
            <Item extra={`${moment(startTime).format('HH:mm')}`} wrap>
              탑승 시간
            </Item>
            <Item extra={`${fee}원`}>요금</Item>
            <Item extra={`${carModel} | ${plateNumber}`} wrap>
              택시 정보
            </Item>
          </List>
        </Card.Body>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .am-card-body {
    padding: 0 15px;
  }
  .am-list-item {
    min-height: 0.6rem !important;
    div {
      padding: 0.1rem !important;
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
