import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { text } from '@storybook/addon-knobs';

import Path from '../components/userMatching/Path';

export default {
  title: 'User/Matching',
  component: Path,
} as Meta;

export const PathComponent = () => <Path startPoint={text('출발지', '도쿄')} endPoint={text('도착지', '도쿄타워')} />;
