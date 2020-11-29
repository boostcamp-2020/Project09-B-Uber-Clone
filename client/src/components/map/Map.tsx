import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../common/Marker';
import { Location, PathPoint } from '@custom-types';

const Map: React.FC<{
  center: Location;
  location: Location;
  pathPoint: PathPoint;
  zoom: number;
  updateMyLocation: () => void;
}> = ({ center, location, pathPoint, zoom, updateMyLocation }) => {
  useEffect(() => {
    setInterval(updateMyLocation, 1000);
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API || '' }}
        defaultZoom={zoom}
        center={center}
      >
        <Marker lat={location.lat} lng={location.lng} color="#95A5A6" />
        <Marker lat={pathPoint.startPoint.lat} lng={pathPoint.startPoint.lng} color="#4285F4" />
        <Marker lat={pathPoint.endPoint.lat} lng={pathPoint.endPoint.lng} color="#FBBC04" />
      </GoogleMapReact>
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 37.5006226,
    lng: 127.0231786,
  },
  zoom: 16,
};

export default Map;
