import React from 'react';
import { Meta } from '@storybook/react/types-6-0';

import Matching from '../components/userMatching/Matching';

export default {
  title: 'User/Matching',
  component: Matching,
} as Meta;

export const MatchingComponent = () => <Matching />;
