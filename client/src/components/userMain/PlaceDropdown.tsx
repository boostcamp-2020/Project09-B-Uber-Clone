import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { LatLng } from 'react-google-places-autocomplete/build/GooglePlacesAutocomplete.types';

/**
 * https://tintef.github.io/react-google-places-autocomplete 참고
 */

interface dropdownProps {
  defalutPlace?: string;
}

// selectHandler는 장소의 이름과 위경도를 받아 처리하는 함수입니다
const PlaceDropdown: React.FC<dropdownProps> = ({ defalutPlace = '' }: dropdownProps) => {
  const onSelect = async ({ value }: any) => {
    const placeName = value.terms[0].value;
    const geocode = await geocodeByPlaceId(value.place_id);
    const latLng = (await getLatLng(geocode[0])) as { lat: number; lng: number };
    console.log(placeName, geocode, latLng);
    // TODO : Dispatch - select start/end
    // selectHandler(placeName, latLng);
  };

  return (
    <>
      <GooglePlacesAutocomplete
        debounce={800}
        selectProps={{
          onChange: onSelect,
          defaultInputValue: defalutPlace,
          maxMenuHeight: 100,
        }}
      />
    </>
  );
};

export default PlaceDropdown;
