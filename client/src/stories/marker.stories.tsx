import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { number } from '@storybook/addon-knobs';

import Marker from '../components/Marker';

export default {
  title: 'Map/Map',
  component: Marker,
} as Meta;

export const MapMarker = () => <Marker lat={number('위도', 37.5006226)} lng={number('경도', 127.0231786)} />;
