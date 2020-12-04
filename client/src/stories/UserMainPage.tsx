import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import Page from '../pages/user/UserMainPage';

export default {
  title: 'User/MainPage',
  component: Page,
} as Meta;

export const UserMainPage = () => <Page />;
