import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { number, text, date } from '@storybook/addon-knobs';

import HistoryBox from '../components/userHistory/HistoryBox';

export default {
  title: 'History/Box',
  component: HistoryBox,
} as Meta;

export const Example = () => (
  <HistoryBox
    startLocation={text('출발지', '서울역')}
    endLocation={text('도착지', '부산역')}
    fee={number('금액', 5000)}
    carModel={text('차종', '마이바흐')}
    plateNumber={text('번호판', '서울 바 7777')}
    startTime={date('출발일시', new Date('2020-12-07 17:00:00'))}
    endTime={date('도착일시', new Date('2020-12-07 18:00:00'))}
  />
);
