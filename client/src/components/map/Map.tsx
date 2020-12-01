import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '../common/Marker';
import { Location, PathPoint } from '@custom-types';
import ExpectedInfo from '@components/userMain/ExpectedInfo';

const Map: React.FC<{
  center: Location;
  location: Location;
  pathPoint: PathPoint;
  zoom: number;
  updateMyLocation: () => void;
}> = ({ center, location, pathPoint, zoom, updateMyLocation }) => {
  const [maps, setMaps] = useState({ map: null });
  const [check, setCheck] = useState(false);
  const [time, setTime] = useState('');
  const [fee, setFee] = useState(3800);
  const renderDirection: (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => void = (
    result,
    status,
  ) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const directionsRenderer = new google.maps.DirectionsRenderer();
      setCheck(true);
      const distance = result.routes[0].legs[0].distance.value;
      const duration = result.routes[0].legs[0].duration.value;
      const calc = 3800 + ((distance - 2000) / 110 + duration / 31) * 100;
      setFee(Math.ceil(calc));
      setTime(result.routes[0].legs[0].duration.text);
      directionsRenderer.setMap(maps.map);
      directionsRenderer.setDirections(result);
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
        {check && (
          <>
            <ExpectedInfo name="예상 시간" value={time} />
            <ExpectedInfo name="예상 요금" value={`${fee}원`} />
          </>
        )}
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
