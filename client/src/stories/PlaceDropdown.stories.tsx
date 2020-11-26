import React, { useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';

import PlaceDropdown from '../components/userMain/PlaceDropdown';

export default {
  title: 'User Main/PlaceDropdown',
  component: PlaceDropdown,
} as Meta;

export const PlaceDropdownExample: React.FC = () => {
  const selectHandler = (placeName, latLng) => {
    console.log(placeName, latLng);
  };

  return <PlaceDropdown selectHandler={selectHandler} />;
};

export const PlaceDropdownWithDefaultPlace: React.FC = () => {
  const [place, setPlace] = useState('강남구');

  const selectHandler = (placeName, latLng) => {
    console.log(placeName, latLng);
  };

  return <PlaceDropdown defalutPlace={place} selectHandler={selectHandler} />;
};
