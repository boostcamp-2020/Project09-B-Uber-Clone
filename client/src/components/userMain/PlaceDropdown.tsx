import React, { useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { updateStartPoint, updateEndPoint } from '../../stores/modules/pathPoint';
import { useDispatch } from 'react-redux';
import { Location, IGeocode } from '@custom-types';

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

  const selectHandler = (latLng: Location, geocode: IGeocode, type: string) => {
    if (type === 'start') return dispatch(updateStartPoint(latLng, geocode));
    return dispatch(updateEndPoint(latLng, geocode));
  };

  const onSelect = async ({ value }: any) => {
    setPlaceValue(value);
    const serchedGeocode = await geocodeByPlaceId(value.place_id);
    const latLng = (await getLatLng(serchedGeocode[0])) as { lat: number; lng: number };

    const geocode: IGeocode = {
      PointName: value.terms[0].value,
      placeId: serchedGeocode && serchedGeocode[0].place_id,
    };
    selectHandler(latLng, geocode, type);
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
