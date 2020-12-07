import React from 'react';
import MapContainer from '@containers/MapContainer';
import InputPlaces from '@components/userMain/InputPlaces';
import PreReqData from '@components/userMain/PreReqData';
import { PreData } from '@custom-types';
import { useSelector } from 'react-redux';
import { useGoogleMapApiState } from 'src/contexts/GoogleMapProvider';
import Menu from '@components/common/Menu';

const UserMainPage: React.FC = () => {
  const preData = useSelector((state: { preData: PreData }) => state.preData);
  const { loaded } = useGoogleMapApiState();
  const info = preData.info;
  return (
    <>
      {loaded && (
        <>
          <InputPlaces />
          <MapContainer />
          {preData.isSetPath && <PreReqData time={info.time} fee={info.fee} />}
          <Menu type="user" />
        </>
      )}
    </>
  );
};

export default UserMainPage;
