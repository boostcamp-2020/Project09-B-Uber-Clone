import React from 'react';
import ContentWrapper from './ContentWrapper';
import PlaceDropdown from '../userMain/PlaceDropdown';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { PathPoint } from '@custom-types';

const InputPlaces: React.FC = () => {
  const pathPoint = useSelector((state: { pathPoint: PathPoint }) => state.pathPoint);
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
  color: #181818;
  font-weight: 300;
`;

const WrapDropdown = styled.div`
  width: 80%;
  margin-left: 10px;
`;

export default InputPlaces;
