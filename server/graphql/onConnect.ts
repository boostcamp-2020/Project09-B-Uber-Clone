import Models from '../models';
import cookie from 'cookie';
import cookieParser from 'cookie-parser';
import { AuthenticationError } from 'apollo-server-express';
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

  return { cookies: decoded, dataSources: Models, isConnection: true };
};
