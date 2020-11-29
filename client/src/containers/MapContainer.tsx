import React, { useEffect, useState } from 'react';
import Map from '@components/map/Map';
import { useSelector, useDispatch } from 'react-redux';
import { updateLocation } from '../stores/modules/location';
import { updateStartPoint } from '../stores/modules/pathPoint';
import { Location, PathPoint } from '@custom-types';
import { Toast } from 'antd-mobile';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const MapContainer: React.FC = () => {
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
      {isGPSLoaded === true ? (
        <Map center={center} location={location} pathPoint={pathPoint} zoom={16} updateMyLocation={updateMyLocation} />
      ) : (
        <CenterDIV>
          <Spin indicator={antIcon} />
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
