import React from 'react';
import { Button } from 'antd-mobile';

interface CallButtonPropsType {
  phone: string;
}
const CallButton: React.FC<CallButtonPropsType> = ({ phone }) => {
  const onClick = () => {
    location.href = `tel:${phone}`;
  };
  return (
    <Button
      style={{ margin: '10px', backgroundColor: '#cccccc', cursor: 'pointer', position: 'relative' }}
      icon={<img src="https://img.icons8.com/ios-filled/48/000000/phone.png" />}
      onClick={onClick}
    />
  );
};

export default CallButton;
