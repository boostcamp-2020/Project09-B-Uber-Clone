import React, { useState, useCallback } from 'react';
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { updateStartPoint, updateEndPoint } from '@stores/modules/pathPoint';
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

  const selectHandler = (latLng: Location, placeName: string, type: string, placeId?: string) => {
    if (type === 'start') return dispatch(updateStartPoint(latLng, placeName, placeId));
    return dispatch(updateEndPoint(latLng, placeName, placeId));
  };

  const onSelect = useCallback(
    async ({ value }: any) => {
      setPlaceValue(value);
      const searchedGeocode = await geocodeByPlaceId(value.place_id);
      const latLng = (await getLatLng(searchedGeocode[0])) as { lat: number; lng: number };
      const placeName = value.terms[0].value;
      const placeId = searchedGeocode && searchedGeocode[0].place_id;
      selectHandler(latLng, placeName, type, placeId);
    },
    [selectHandler],
  );

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
