import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.config';
import { repositoryFactory } from '../repositories/repository.factory';
import { AppError } from '../utils/app-error';
import { getOrm } from '../utils/orm-selector';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return next(new AppError('Missing access token', 401));

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as any;
    req.user = payload;
    return next();
  } catch {
    return next(new AppError('Invalid or expired access token', 401));
  }
};

export const validateSession = async (req: Request, res: Response, next: NextFunction) => {
  const sessionToken = req.headers['x-session-token'] as string;
  if (!sessionToken) return next(new AppError('Missing session token', 401));

  const orm = getOrm(req);
  const sessionRepo = repositoryFactory.session(orm);
  const session = await sessionRepo.findBySessionToken(sessionToken);
  const sessionData = session?.dataValues || session;

  if (!sessionData) return next(new AppError('Invalid session', 401));
  if (new Date(sessionData.expiresAt).getTime() < Date.now()) return next(new AppError('Session expired', 401));

  return next();
};

export const authorizeRoles = (...roles: Array<'admin' | 'employee' | 'client'>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError('Unauthorized', 401));
    if (!roles.includes(req.user.role)) return next(new AppError('Forbidden', 403));
    return next();
  };
};
