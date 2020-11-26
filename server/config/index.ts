import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export default {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,

  CLIENT_HOST: process.env.CLIENT_HOST,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  JWT_SECRET: process.env.JWT_SECRET,
};
