import React, { useEffect, useState } from 'react';
import Map from '@components/map/Map';
import Loading from '@components/common/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { updateLocation } from '@stores/modules/location';
import { updateStartPoint } from '@stores/modules/pathPoint';
import getLocation from '@utils/getLocation';
import { Location, PathPoint } from '@custom-types';
import { Toast } from 'antd-mobile';
import styled from 'styled-components';

interface Props {
  isMatched?: boolean;
  taxiLocation?: Location;
  directionRenderer?: any;
}

const MapContainer: React.FC<Props> = ({ isMatched = false, taxiLocation = { lat: 0, lng: 0 }, directionRenderer }) => {
  const location = useSelector((state: { location: Location }) => state.location);
  const pathPoint = useSelector((state: { pathPoint: PathPoint }) => state.pathPoint);
  const dispatch = useDispatch();
  const [center, setCenter] = useState(location);
  const [isGPSLoaded, setGPSLoaded] = useState(false);
  // const [isSetNearPlace, setNearPlace] = useState(false);

  useEffect(() => {
    initializeLocation();
  }, []);

  const initializeLocation = async () => {
    const startLocation: Location = await getLocation();
    dispatch(updateLocation(startLocation));
    if (!pathPoint.isSetStartPoint) {
      setCenter(startLocation);
    }
    setGPSLoaded(true);
  };

  const findNearPlace = (map: any) => {
    if (pathPoint.isSetStartPoint) return;
    // if (isSetNearPlace) return;
    // setNearPlace(true);

    const service = new google.maps.places.PlacesService(map);

    const request = {
      location: center,
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

  const updateMyLocation = async () => {
    try {
      const myLocation: Location = await getLocation();
      dispatch(updateLocation(myLocation));
    } catch (error) {
      console.error(error);
      Toast.show('GPS 사용이 불가능합니다.', Toast.SHORT);
    }
  };

  return (
    <>
      {isGPSLoaded ? (
        <Map
          center={center}
          location={location}
          pathPoint={pathPoint}
          zoom={16}
          updateMyLocation={updateMyLocation}
          isMatched={isMatched}
          taxiLocation={taxiLocation}
          directionRenderer={directionRenderer}
          findNearPlace={findNearPlace}
        />
      ) : (
        <CenterDIV>
          <Loading />
        </CenterDIV>
      )}
    </>
  );
};

const CenterDIV = styled.div`
  display: flex;
  justify-content: center;
`;

export default MapContainer;
