import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { getOrm } from '../utils/orm-selector';
import { successResponse } from '../utils/response';

const userService = new UserService();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(201).json(successResponse('User created successfully', await userService.create(getOrm(req), req.body))); }
  catch (error) { next(error); }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(200).json(successResponse('Users fetched successfully', await userService.findAll(getOrm(req)))); }
  catch (error) { next(error); }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(200).json(successResponse('User fetched successfully', await userService.findById(getOrm(req), Number(req.params.id)))); }
  catch (error) { next(error); }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(200).json(successResponse('User updated successfully', await userService.update(getOrm(req), Number(req.params.id), req.body))); }
  catch (error) { next(error); }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try { await userService.delete(getOrm(req), Number(req.params.id)); res.status(200).json(successResponse('User deleted successfully')); }
  catch (error) { next(error); }
};
