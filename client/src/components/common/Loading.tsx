import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loading: React.FC<{ size?: number }> = ({ size = 24 }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size }} spin />;
  return <Spin indicator={antIcon} />;
};

export default Loading;
