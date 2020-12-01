import React from 'react';

const DriverMainBody: React.FC<{ isWorking: boolean }> = ({ isWorking }) => {
  return <>{isWorking ? <div>운행중</div> : <div>영업종료</div>}</>;
};

export default DriverMainBody;
