import React from 'react';
import MapContainer from '../../containers/MapContainer';
import InputPlaces from '@components/userMain/InputPlaces';
import { updateStartPoint, updateEndPoint } from '../../stores/modules/pathPoint';
import { useDispatch } from 'react-redux';
import { Location } from '@custom-types';

const UserMainPage: React.FC = () => {
  const dispatch = useDispatch();

  const selectStartHandler = (placeName: string, latLng: Location) => {
    dispatch(updateStartPoint(latLng));
  };
  const selectEndHandler = (placeName: string, latLng: Location) => {
    dispatch(updateEndPoint(latLng));
  };

  return (
    // 출발 입력 탭 selectHandler={selectStartHandler}
    // 도착 입력 탭 selectHandler={selectEndHandler}
    <>
      <InputPlaces />
      <MapContainer />;
    </>
  );
};

export default UserMainPage;
