import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from '@components/common/Marker';
import TaxiMarker from '@components/common/TaxiMarker';
import { Location, PathPoint } from '@custom-types';
import { updatePath } from '@stores/modules/preData';
import { useDispatch } from 'react-redux';
import { useGoogleMapApiState } from 'src/contexts/GoogleMapProvider';

const Map: React.FC<{
  center: Location;
  location: Location;
  pathPoint: PathPoint;
  updateMyLocation: () => void;
  isMatched: boolean;
  taxiLocation: Location;
  findNearPlace: (map: any) => void;
}> = ({ center, location, pathPoint, updateMyLocation, isMatched, taxiLocation, findNearPlace }) => {
  const [maps, setMaps]: any = useState({ map: null });
  const { directionRenderer } = useGoogleMapApiState();
  const dispatch = useDispatch();
  const renderDirection: (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => void = (
    result,
    status,
  ) => {
    if (status === google.maps.DirectionsStatus.OK && directionRenderer) {
      const distance = result.routes[0].legs[0].distance;
      const duration = result.routes[0].legs[0].duration;
      const calc = 3800 + ((distance.value - 2000) / 110 + duration.value / 31) * 100;
      dispatch(updatePath({ time: duration.text, fee: Math.ceil(calc) }));
      directionRenderer.setMap(maps.map);
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
  }, [pathPoint]);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '', libraries: ['places'] }}
        defaultZoom={16}
        center={center}
        onGoogleApiLoaded={setMaps}
        onTilesLoaded={() => {
          findNearPlace(maps.map);
        }}
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
