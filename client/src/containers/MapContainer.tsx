import React, { useState } from 'react';
import Map from '../components/Map';
import { connect } from 'react-redux';
import { updateLocation } from '../stores/modules/location';
import { Location } from '../types';
import { Toast } from 'antd-mobile';

const MapContainer: React.FC<{ location: Location; update: (location: Location) => void }> = ({ location, update }) => {
  const [center, setCenter] = useState(location);
  const updateMyLocation = async () => {
    try {
      const myLocation: Location = await getLocation();
      update(myLocation);
    } catch (error) {
      Toast.show('GPS가 사용이 불가능합니다.', Toast.SHORT);
    }
  };

  const moveCenterMyLocation = async () => {
    try {
      const location = await getLocation();
      setCenter(location);
    } catch (error) {
      Toast.show('GPS가 사용이 불가능합니다.', Toast.SHORT);
    }
  };

  const zoom = 16;
  return (
    <Map
      center={center}
      location={location}
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

const mapStateToProps = (state: { location: Location }) => ({
  location: state.location,
});

const mapDispatchToProps = (dispatch: any) => ({
  update: (location: Location) => dispatch(updateLocation(location)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);
