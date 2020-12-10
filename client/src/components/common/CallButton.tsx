import React, { useCallback } from 'react';
import { Button } from 'antd-mobile';

interface CallButtonPropsType {
  phone: string;
}
const CallButton: React.FC<CallButtonPropsType> = ({ phone }) => {
  const onClick = useCallback(() => {
    location.href = `tel:${phone}`;
  }, [phone]);

  return (
    <Button
      style={{ backgroundColor: '#fbbc04', cursor: 'pointer', position: 'relative' }}
      icon={<img src="https://img.icons8.com/ios-filled/48/000000/phone.png" />}
      onClick={onClick}
    />
  );
};

export default CallButton;
