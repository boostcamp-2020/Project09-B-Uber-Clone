import { Location } from '@custom-types';
import { updateStartPoint } from '@stores/modules/pathPoint';
import { Dispatch } from 'react';

const setStartToNearPlace = (dispatch: Dispatch<any>, location: Location, map: any): void => {
  const service = new google.maps.places.PlacesService(map);

  const request = {
    location: location,
    type: 'store',
    rankBy: google.maps.places.RankBy.DISTANCE,
  };

  service.nearbySearch(request, (results, status) => {
    const result = results && results[0];
    if (status === google.maps.places.PlacesServiceStatus.OK && result) {
      const { geometry, name, place_id } = result;
      dispatch(
        updateStartPoint({ lat: geometry?.location.lat() || 0, lng: geometry?.location.lng() || 0 }, name, place_id),
      );
    }
  });
};

export default setStartToNearPlace;
