import jwt from 'jsonwebtoken';
import Config from '../config';
import mongoose from 'mongoose';
import { authError } from '../graphql/schemaDirectives/authError';

export const verifyUserByCookie = async (cookie: string, requestSchema: mongoose.SchemaType): Promise<string> => {
  const { id } = jwt.verify(cookie.trim(), Config.JWT_SECRET);
  if (!id) authError();
  const result = await requestSchema.findById(id);
  if (!result) authError();
  return id;
};
