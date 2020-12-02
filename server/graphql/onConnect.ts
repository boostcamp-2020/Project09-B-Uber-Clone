import Models from '../models';
import cookie from 'cookie';
import cookieParser from 'cookie-parser';
import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import Config from '../config';

export const onConnect = (_, webSocket) => {
  const requestCookie = webSocket.upgradeReq.headers.cookie;
  if (!requestCookie) {
    throw new AuthenticationError('유효하지 않은 사용자입니다');
  }
  const parsedCookie = cookie.parse(requestCookie);
  const cookies = cookieParser.JSONCookies(parsedCookie);
  const decoded = cookieParser.signedCookies(cookies, Config.COOKIE_SECRET);
  if (!decoded.userToken && !decoded.driverToken) throw new AuthenticationError('유효하지 않은 사용자입니다');

  const ids = {
    userId: decoded.userToken && jwt.verify(decoded.userToken, Config.JWT_SECRET).id,
    driverId: decoded.driverToken && jwt.verify(decoded.driverToken, Config.JWT_SECRET).id,
  };

  return { ...ids, dataSources: Models, isConnection: true };
};
