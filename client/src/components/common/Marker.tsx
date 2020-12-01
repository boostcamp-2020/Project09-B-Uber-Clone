import React from 'react';
import { Location } from '../../types';

const markerSVG =
  'M79 241 c-23 -23 -29 -38 -29 -72 0 -38 5 -48 45 -85 25 -23 45 -46 45 -53 0 -6 5 -11 10 -11 6 0 10 5 10 11 0 7 20 30 45 53 40 37 45 47 45 85 0 92 -106 137 -171 72z m101 -71 c0 -27 -3 -30 -30 -30 -27 0 -30 3 -30 30 0 27 3 30 30 30 27 0 30 -3 30 -30z';

const Marker: React.FC<Location & { color: string }> = ({ color }) => {
  return (
    <div>
      <svg width="30.000000pt" height="30.000000pt" viewBox="0 0 30.000000 30.000000">
        <g transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)" fill={color} stroke="none">
          <path d={markerSVG} />
        </g>
      </svg>
    </div>
  );
};

export default Marker;
