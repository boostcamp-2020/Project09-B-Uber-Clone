import Models from '../models';
import cookieParser from 'cookie-parser';
import { AuthenticationError } from 'apollo-server-express';
import Config from '../config';

export const onConnect = (_, webSocket) => {
  const requestCookie = webSocket.upgradeReq.headers.cookie;
  if (!requestCookie) throw new AuthenticationError('유효하지 않은 사용자입니다');

  const tokens = requestCookie.split(';');
  const cookies = tokens.reduce((acc: any, token: string) => {
    if (token.trim().startsWith('userToken=s%3A')) acc.userToken = token.split('=')[1].trim().replace('%3A', ':');
    else if (token.trim().startsWith('driverToken=s%3A'))
      acc.driverToken = token.split('=')[1].trim().replace('%3A', ':');
    return acc;
  }, {});

  const decoded = cookieParser.signedCookies(cookies, Config.COOKIE_SECRET);
  if (!decoded.userToken && !decoded.driverToken) throw new AuthenticationError('유효하지 않은 사용자입니다');

  return { cookies: decoded, dataSources: Models, isConnection: true };
};
