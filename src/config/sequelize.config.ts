import { Sequelize } from 'sequelize';
import { env } from './env.config';

export const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});
