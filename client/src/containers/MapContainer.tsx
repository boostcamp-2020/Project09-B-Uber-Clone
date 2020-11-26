import React, { useEffect, useState } from 'react';
import Map from '@components/map/Map';
import { useSelector, useDispatch } from 'react-redux';
import { updateLocation } from '../stores/modules/location';
import { updateStartPoint } from '../stores/modules/pathPoint';
import { Location, PathPoint } from '../types';
import { Toast } from 'antd-mobile';

const MapContainer: React.FC = () => {
  const location = useSelector((state: { location: Location }) => state.location);
  const pathPoint = useSelector((state: { pathPoint: PathPoint }) => state.pathPoint);
  const dispatch = useDispatch();
  const [center, setCenter] = useState(location);
  useEffect(() => {
    (async () => {
      const startPoint: Location = await getLocation();
      dispatch(updateStartPoint(startPoint));
    })();
  }, []);

  const updateMyLocation = async () => {
    try {
      const myLocation: Location = await getLocation();
      dispatch(updateLocation(myLocation));
    } catch (error) {
      console.error(error);
      Toast.show('GPS가 사용이 불가능합니다.', Toast.SHORT);
    }
  };

  const moveCenterMyLocation = async () => {
    try {
      const location: Location = await getLocation();
      setCenter(location);
    } catch (error) {
      console.error(error);
      Toast.show('GPS가 사용이 불가능합니다.', Toast.SHORT);
    }
  };

  const zoom = 16;
  return (
    <Map
      center={center}
      location={location}
      pathPoint={pathPoint}
      zoom={zoom}
      updateMyLocation={updateMyLocation}
      moveCenterMyLocation={moveCenterMyLocation}
    />
  );
};

const getLocation = (): Promise<Location> => {
  return new Promise<Location>((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        },
      );
    } else {
      reject(new Error('Unable to retrieve your location'));
    }
  });
};

export default MapContainer;
