import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loading: React.FC<{ color?: string; size?: number }> = ({ color, size = 24 }) => {
  const antIcon = <LoadingOutlined style={{ fontSize: size, color }} spin />;
  return <Spin indicator={antIcon} />;
};

export default Loading;
