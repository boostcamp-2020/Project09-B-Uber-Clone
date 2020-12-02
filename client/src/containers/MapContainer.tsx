import React, { useEffect, useState } from 'react';
import Map from '@components/map/Map';
import Loading from '@components/common/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { updateLocation } from '../stores/modules/location';
import { updateStartPoint } from '../stores/modules/pathPoint';
import { Location, PathPoint } from '@custom-types';
import { Toast } from 'antd-mobile';
import styled from 'styled-components';
import TaxiMarker from '@components/common/TaxiMarker';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface Props {
  isMatched?: boolean;
  taxiLocation?: Location;
}

const MapContainer: React.FC<Props> = ({ isMatched = false, taxiLocation = { lat: 0, lng: 0 } }) => {
  const location = useSelector((state: { location: Location }) => state.location);
  const pathPoint = useSelector((state: { pathPoint: PathPoint }) => state.pathPoint);
  const dispatch = useDispatch();
  const [center, setCenter] = useState(location);
  const [isGPSLoaded, setGPSLoaded] = useState(false);

  useEffect(() => {
    initializeLocation();
  }, []);

  const initializeLocation = async () => {
    const startLocation: Location = await getLocation();
    dispatch(updateLocation(startLocation));
    dispatch(updateStartPoint(startLocation));
    setCenter(startLocation);
    setGPSLoaded(true);
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
