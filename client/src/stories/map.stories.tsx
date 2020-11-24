import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { object, number } from '@storybook/addon-knobs';

import Map from '../components/Map';

export default {
  title: 'Map/Map',
  component: Map,
} as Meta;

export const GoogleMap = () => (
  <Map center={object('위도, 경도', { lat: 37.5006226, lng: 127.0231786 })} zoom={number('줌 레벨', 16)} />
);
