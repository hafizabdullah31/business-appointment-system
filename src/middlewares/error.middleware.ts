import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/app-error';
import { errorResponse } from '../utils/response';
import { logger } from '../utils/logger';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json(errorResponse('Validation failed', err.errors));
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json(errorResponse(err.message));
  }

  logger.error('Unhandled error', err);
  return res.status(500).json(errorResponse('Internal server error'));
}
