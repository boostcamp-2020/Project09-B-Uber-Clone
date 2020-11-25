import React from 'react';
import styled from 'styled-components';

const Label = styled.div`
  font-size: 17px;
  font-weight: bold;
  padding: 30px 0;
`;

const LoginLabel: React.FC = ({ children }) => {
  return (
    <div>
      <Label>{children}</Label>
    </div>
  );
};

export default LoginLabel;
