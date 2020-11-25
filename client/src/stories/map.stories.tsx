import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { object, number } from '@storybook/addon-knobs';
import { Provider } from 'react-redux';
import MapContainer from '../containers/MapContainer';
import store from '../stores';

export default {
  title: 'Map/Map',
  component: MapContainer,
} as Meta;

export const GoogleMap = () => (
  <Provider store={store}>
    <MapContainer />
  </Provider>
);
