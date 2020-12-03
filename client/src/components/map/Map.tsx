import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '@components/common/Marker';
import TaxiMarker from '@components/common/TaxiMarker';
import { Location, PathPoint } from '@custom-types';
import { updatePath } from '@stores/modules/preData';
import { useDispatch } from 'react-redux';

const Map: React.FC<{
  center: Location;
  location: Location;
  pathPoint: PathPoint;
  zoom: number;
  directionRenderer: any;
  updateMyLocation: () => void;
  isMatched: boolean;
  taxiLocation: Location;
}> = ({ center, location, pathPoint, zoom, updateMyLocation, isMatched, taxiLocation, directionRenderer }) => {
  const [maps, setMaps] = useState({ map: null });
  const dispatch = useDispatch();
  const renderDirection: (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => void = (
    result,
    status,
  ) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const distance = result.routes[0].legs[0].distance;
      const duration = result.routes[0].legs[0].duration;
      const calc = 3800 + ((distance.value - 2000) / 110 + duration.value / 31) * 100;
      dispatch(updatePath({ time: duration.text, fee: Math.ceil(calc) }));
      directionRenderer.setMap(maps.map);
      directionRenderer.setDirections(result);
    }
  };

  useEffect(() => {
    setInterval(updateMyLocation, 1000);
  }, []);

  useEffect(() => {
    const { startPoint, endPoint } = pathPoint;
    if (maps && pathPoint.isSetStartPoint && pathPoint.isSetEndPoint) {
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
        onGoogleApiLoaded={setMaps}
      >
        <Marker lat={location.lat} lng={location.lng} color="#95A5A6" />
        {pathPoint.isSetStartPoint && (
          <Marker lat={pathPoint.startPoint.lat} lng={pathPoint.startPoint.lng} color="#4285F4" />
        )}
        {pathPoint.isSetEndPoint && (
          <Marker lat={pathPoint.endPoint.lat} lng={pathPoint.endPoint.lng} color="#FBBC04" />
        )}
        {isMatched && <TaxiMarker lat={taxiLocation.lat} lng={taxiLocation.lng} />}
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
