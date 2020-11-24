import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import { Location } from '../types';

const Map: React.FC<{ center: Location; zoom: number }> = ({ center, zoom }) => {
  const [location, setLocation] = useState(center);
  const [myLocation, setMyLocation] = useState(center);

  const updateLocation = async () => {
    try {
      const myLocation: Location = await getLocation();
      setMyLocation(myLocation);
    } catch (error) {
      alert('GPS가 사용이 불가능합니다.');
    }
  };

  const moveCenterMyLocation = async () => {
    try {
      const location = await getLocation();
      setLocation(location);
    } catch (error) {
      alert('GPS가 사용이 불가능합니다.');
    }
  };

  setTimeout(updateLocation, 3000);
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <div>
        {location.lat}, {location.lng}
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultZoom={zoom}
        center={location}
        onTilesLoaded={() => {
          updateLocation();
          moveCenterMyLocation();
        }}
      >
        <Marker lat={myLocation.lat} lng={myLocation.lng} color="#95A5A6" />
      </GoogleMapReact>
    </div>
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

Map.defaultProps = {
  center: {
    lat: 37.5006226,
    lng: 127.0231786,
  },
  zoom: 16,
};

export default Map;
