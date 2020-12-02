import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateStartPoint, updateEndPoint } from '../../stores/modules/pathPoint';
import { gql, useSubscription } from '@apollo/client';
import { Loader } from '@googlemaps/js-api-loader';
import { Toast } from 'antd-mobile';
import MapContainer from '../../containers/MapContainer';
import CallButton from '@components/common/CallButton';
import StartLocationInfo from '@components/driverMatching/StartLocationInfo';
import styled from 'styled-components';

const loader = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || '',
  libraries: ['places'],
});

const MATCHED_USER = gql`
  subscription {
    driverServiceSub {
      uid
      request {
        startLocation
        endLocation
      }
    }
  }
`;

const DriverMatchingPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data, error } = useSubscription(MATCHED_USER);
  const [googleMapApi, setGoogleMapApi]: any = useState({ loaded: false, directionRenderer: null });
  const [userRequest, setUserRequest] = useState({
    uid: '',
    startLocation: { name: '', Latlng: { lat: '', lng: '' } },
    endLocation: { name: '', Latlng: { lat: '', lng: '' } },
  });

  const initialScriptLoad = async () => {
    await loader.load();
    setGoogleMapApi({ loaded: true, directionRenderer: new google.maps.DirectionsRenderer() });
  };

  useEffect(() => {
    initialScriptLoad();
  }, []);

  useEffect(() => {
    if (data?.driverServiceSub) {
      const requsetData = data.userMatchingSub;
      const { startLocation, endLocation } = requsetData.request;
      setUserRequest({ uid: requsetData.uid, startLocation: startLocation, endLocation: endLocation });
      dispatch(updateStartPoint(startLocation.Latlng));
      dispatch(updateEndPoint(endLocation.Latlng));
    }
  }, [data]);

  useEffect(() => {
    if (error) Toast.fail('유저 정보를 확인할 수 없습니다.');
  }, [error]);

  return (
    <>
      {googleMapApi.loaded && (
        <>
          <MapContainer directionRenderer={googleMapApi.directionRenderer} />
          <Overlay>
            <StartLocationInfo startLocation={userRequest.startLocation.name} />
            <CallButton phone="010-0000-0000" />
          </Overlay>
        </>
      )}
    </>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export default DriverMatchingPage;
