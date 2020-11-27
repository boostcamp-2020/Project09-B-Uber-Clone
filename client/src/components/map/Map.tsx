import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../common/Marker';
import { Location, Marker as MarkerType, PathPoint } from '@custom-types';

const Map: React.FC<{
  center: Location;
  location: Location;
  pathPoint: PathPoint;
  zoom: number;
  updateMyLocation: () => void;
  moveCenterMyLocation: () => void;
}> = ({ center, location, pathPoint, zoom, updateMyLocation, moveCenterMyLocation }) => {
  const [maps, setMaps] = useState({ map: null });

  const renderDirection: (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => void = (
    result,
    status,
  ) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const directionsRenderer = new google.maps.DirectionsRenderer();
      /**
       * result.routes[0].legs[0].distance.text => 이동 거리
       * result.routes[0].legs[0].duration.text => 이동에 필요한 시간
       */
      directionsRenderer.setMap(maps.map);
      directionsRenderer.setDirections(result);
    }
  };

  useEffect(() => {
    setInterval(updateMyLocation, 1000);
  }, []);

  useEffect(() => {
    const { startPoint, endPoint } = pathPoint;
    if (maps && startPoint.lat && endPoint.lat) {
      const origin: Location = { lat: startPoint.lat as number, lng: startPoint.lng as number };
      const destination: Location = { lat: endPoint.lat as number, lng: endPoint.lng as number };
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        renderDirection,
      );
    }
  }, [pathPoint]);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '', libraries: ['places'] }}
        defaultZoom={zoom}
        center={center}
        onTilesLoaded={() => {
          updateMyLocation();
          moveCenterMyLocation();
        }}
        onGoogleApiLoaded={setMaps}
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
