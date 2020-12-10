import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '@components/common/Marker';
import TaxiMarker from '@components/common/TaxiMarker';
import { Location, PathPoint } from '@custom-types';
import { updatePath } from '@stores/modules/preData';
import { useDispatch } from 'react-redux';
import { useGoogleMapApiState, useGoogleMapApiDispatch } from '../../contexts/GoogleMapProvider';

const Map: React.FC<{
  center: Location;
  location: Location;
  pathPoint: PathPoint;
  isMatched: boolean;
  taxiLocation: Location;
}> = ({ center, location, pathPoint, isMatched, taxiLocation }) => {
  const { directionRenderer, maps } = useGoogleMapApiState();
  const mapDispatch = useGoogleMapApiDispatch();
  const dispatch = useDispatch();
  const renderDirection: (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => void = (
    result,
    status,
  ) => {
    if (status === google.maps.DirectionsStatus.OK && directionRenderer) {
      const distance = result.routes[0].legs[0].distance;
      const duration = result.routes[0].legs[0].duration;
      const calc = 38 + ((distance.value - 2000) / 110 + duration.value / 31);
      dispatch(updatePath({ time: duration.text, fee: Math.ceil(calc) * 100 }));
      directionRenderer.setMap(maps);
      directionRenderer.setDirections(result);
    }
  };

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
  }, [pathPoint, maps]);

  const onGoogleApiLoaded = ({ map }: any) => {
    mapDispatch({ type: 'setMaps', maps: map });
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '', libraries: ['places'] }}
        defaultZoom={16}
        center={center}
        onGoogleApiLoaded={onGoogleApiLoaded}
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

export default Map;
