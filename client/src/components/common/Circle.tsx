import React from 'react';

const Circle: React.FC<{ color: string }> = ({ color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172">
      <g transform="translate(16.856,16.856) scale(0.804,0.804)">
        <g
          fill="none"
          fillRule="nonzero"
          stroke="none"
          strokeWidth="none"
          strokeLinecap="butt"
          strokeMiterlimit="10"
          strokeDasharray=""
          strokeDashoffset="0"
          fontFamily="none"
          fontWeight="none"
          fontSize="none"
          textAnchor="none"
        >
          <g fill={color} stroke={color} strokeWidth="40" strokeLinejoin="round">
            <path d="M86,157.66667c-39.41667,0 -71.66667,-32.25 -71.66667,-71.66667c0,-39.41667 32.25,-71.66667 71.66667,-71.66667c39.41667,0 71.66667,32.25 71.66667,71.66667c0,39.41667 -32.25,71.66667 -71.66667,71.66667zM86,28.66667c-31.53333,0 -57.33333,25.8 -57.33333,57.33333c0,31.53333 25.8,57.33333 57.33333,57.33333c31.53333,0 57.33333,-25.8 57.33333,-57.33333c0,-31.53333 -25.8,-57.33333 -57.33333,-57.33333z"></path>
          </g>
          <path d="M0,172v-172h172v172z" fill="none" stroke="none" strokeWidth="1" strokeLinejoin="miter"></path>
          <g fill={color} stroke="none" strokeWidth="1" strokeLinejoin="miter">
            <path d="M86,157.66667c-39.41667,0 -71.66667,-32.25 -71.66667,-71.66667c0,-39.41667 32.25,-71.66667 71.66667,-71.66667c39.41667,0 71.66667,32.25 71.66667,71.66667c0,39.41667 -32.25,71.66667 -71.66667,71.66667zM86,28.66667c-31.53333,0 -57.33333,25.8 -57.33333,57.33333c0,31.53333 25.8,57.33333 57.33333,57.33333c31.53333,0 57.33333,-25.8 57.33333,-57.33333c0,-31.53333 -25.8,-57.33333 -57.33333,-57.33333z"></path>
          </g>
          <path d="" fill="none" stroke="none" strokeWidth="1" strokeLinejoin="miter"></path>
          <path d="" fill="none" stroke="none" strokeWidth="1" strokeLinejoin="miter"></path>
        </g>
      </g>
    </svg>
  );
};

export default Circle;
