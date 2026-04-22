import { Request } from 'express';

export function getOrm(req: Request): 'drizzle' | 'sequelize' {
  const queryOrm = req.query.orm as string;
  if (queryOrm === 'drizzle' || queryOrm === 'sequelize') return queryOrm;
  return (process.env.DEFAULT_ORM as 'drizzle' | 'sequelize') || 'drizzle';
}
