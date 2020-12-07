import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import Btn from '../components/userMatching/MatchingCancelButton';

export default {
  title: 'User/Matching',
  component: Btn,
} as Meta;

export const CancelButton = () => (
  <Btn
    onClickHandler={() => {
      console.log('클릭');
    }}
  />
);
