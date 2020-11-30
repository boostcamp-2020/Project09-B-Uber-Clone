import React from 'react';
import MapContainer from '../../containers/MapContainer';
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
    // Todo: 출발-도착지 입력 탭 컴포넌트
    // 출발 입력 탭 selectHandler={selectStartHandler}
    // 도착 입력 탭 selectHandler={selectEndHandler}
    <MapContainer />
  );
};

export default UserMainPage;
