import React, { useEffect } from 'react';
import ContentWrapper from '@components/common/ContentWrapper';
import PlaceDropdown from '@components/userMain/PlaceDropdown';
import styled from 'styled-components';
import { shallowEqual, useSelector } from 'react-redux';
import { PathPoint, Location } from '@custom-types';
import setStartToNearPlace from '@utils/setStartToNearPlace';
import { useGoogleMapApiState } from 'src/contexts/GoogleMapProvider';
import { useDispatch } from 'react-redux';

const InputPlaces: React.FC = () => {
  const pathPoint = useSelector((state: { pathPoint: PathPoint }) => state.pathPoint);
  const location = useSelector((state: { location: Location }) => state.location, shallowEqual);
  const { maps } = useGoogleMapApiState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (maps && !pathPoint.isSetStartPoint) {
      setStartToNearPlace(dispatch, location, maps);
    }
  }, [maps, location]);

  const Dropdown = () => {
    return (
      <>
        <Div>
          <p>출발</p>
          <WrapDropdown>
            <PlaceDropdown type={'start'} defalutPlace={pathPoint.startPointName} />
          </WrapDropdown>
        </Div>
        <Div>
          <p>도착</p>
          <WrapDropdown>
            <PlaceDropdown type={'end'} defalutPlace={pathPoint.endPointName} />
          </WrapDropdown>
        </Div>
      </>
    );
  };

  const PlacesInputComponent = ContentWrapper(Dropdown);
  return <PlacesInputComponent putOn="top" />;
};

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  color: #181818;
  font-weight: 300;
`;

const WrapDropdown = styled.div`
  width: 80%;
  margin-left: 10px;
`;

export default InputPlaces;
