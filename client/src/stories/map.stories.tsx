import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import MapContainer from '../containers/MapContainer';

export default {
  title: 'Map/Map',
  component: MapContainer,
} as Meta;

export const GoogleMap = () => <MapContainer />;
