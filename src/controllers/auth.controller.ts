import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { getOrm } from '../utils/orm-selector';
import { successResponse } from '../utils/response';

const authService = new AuthService();

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orm = getOrm(req);
    const data = await authService.register(orm, req.body);
    res.status(201).json(successResponse('User registered successfully', data));
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orm = getOrm(req);
    const data = await authService.login(orm, req.body);
    res.status(200).json(successResponse('Login successful', data));
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orm = getOrm(req);
    const data = await authService.refresh(orm, req.body.refreshToken);
    res.status(200).json(successResponse('Token refreshed successfully', data));
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orm = getOrm(req);
    await authService.logout(orm, {
      refreshToken: req.body.refreshToken,
      sessionToken: req.body.sessionToken || (req.headers['x-session-token'] as string),
    });
    res.status(200).json(successResponse('Logout successful'));
  } catch (error) {
    next(error);
  }
};
