import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { LatLng } from 'react-google-places-autocomplete/build/GooglePlacesAutocomplete.types';

/**
 * https://tintef.github.io/react-google-places-autocomplete 참고
 */

interface dropdownProps {
  defalutPlace?: string;
  selectHandler: (placeName: string, latLng: LatLng) => void;
}

// 해당 loader는 추후 출발-도착지 입력 탭으로 올려보내주세요
const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '',
  version: 'weekly',
  libraries: ['places'],
});

// selectHandler는 장소의 이름과 위경도를 받아 처리하는 함수입니다
const PlaceDropdown: React.FC<dropdownProps> = ({ defalutPlace = '', selectHandler }: dropdownProps) => {
  const [apiLoaded, setApiLoaded] = useState(false);

  const initialScriptLoad = async () => {
    await loader.load();
    setApiLoaded(true);
  };

  useEffect(() => {
    initialScriptLoad();
  }, []);

  const onSelect = async ({ value }: any) => {
    const placeName = value.terms[0].value;
    const geocode = await geocodeByPlaceId(value.place_id);
    const latLng = (await getLatLng(geocode[0])) as { lat: number; lng: number };

    selectHandler(placeName, latLng);
  };

  return (
    <>
      {apiLoaded && (
        <GooglePlacesAutocomplete
          debounce={800}
          selectProps={{
            onChange: onSelect,
            defaultInputValue: defalutPlace,
            maxMenuHeight: 100,
          }}
        />
      )}
    </>
  );
};

export default PlaceDropdown;
