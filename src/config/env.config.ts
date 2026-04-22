import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT || 3000),
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || 'jwt_secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '15m',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh_secret',
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
  SESSION_SECRET: process.env.SESSION_SECRET || 'session_secret',
  SESSION_EXPIRES_IN: Number(process.env.SESSION_EXPIRES_IN || 86400),
  DEFAULT_ORM: (process.env.DEFAULT_ORM as 'drizzle' | 'sequelize') || 'drizzle',
  NODE_ENV: process.env.NODE_ENV || 'development',
};
