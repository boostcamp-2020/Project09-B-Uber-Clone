import { PathPoint, Request } from '@custom-types';

const pathPointToRequest = (pathPoint: PathPoint): Request => {
  return {
    startLocation: {
      name: pathPoint.startPointName || '',
      latlng: {
        ...pathPoint.startPoint,
      },
    },
    endLocation: {
      name: pathPoint.endPointName || '',
      latlng: {
        ...pathPoint.endPoint,
      },
    },
  };
};

export default pathPointToRequest;
