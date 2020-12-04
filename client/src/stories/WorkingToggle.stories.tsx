import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import WorkingToggle from '../components/driverMain/WorkingToggle';

export default {
  title: 'Driver/MainPage/Toggle',
  component: WorkingToggle,
} as Meta;

export const workingToggle = () => <WorkingToggle />;
