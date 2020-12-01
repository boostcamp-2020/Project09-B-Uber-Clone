import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { LatLng } from 'react-google-places-autocomplete/build/GooglePlacesAutocomplete.types';
import { updateStartPoint, updateEndPoint } from '../../stores/modules/pathPoint';
import { useDispatch } from 'react-redux';
import { Location } from '@custom-types';

/**
 * https://tintef.github.io/react-google-places-autocomplete 참고
 */

interface dropdownProps {
  defalutPlace?: string;
  type: string;
}

const PlaceDropdown: React.FC<dropdownProps> = ({ defalutPlace = '', type }: dropdownProps) => {
  const dispatch = useDispatch();
  const [placeValue, setPlaceValue] = useState(defalutPlace);

  const selectHandler = (placeName: string, latLng: Location, type: string) => {
    if (type === 'start') return dispatch(updateStartPoint(latLng));
    return dispatch(updateEndPoint(latLng));
  };

  const onSelect = async ({ value }: any) => {
    setPlaceValue(value);
    const placeName = value.terms[0].value;
    const geocode = await geocodeByPlaceId(value.place_id);
    const latLng = (await getLatLng(geocode[0])) as { lat: number; lng: number };
    console.log(placeName, geocode, latLng);
    selectHandler(placeName, latLng, type);
  };

  return (
    <>
      <GooglePlacesAutocomplete
        debounce={800}
        selectProps={{
          onChange: onSelect,
          defaultInputValue: placeValue,
          maxMenuHeight: 100,
        }}
      />
    </>
  );
};

export default PlaceDropdown;
