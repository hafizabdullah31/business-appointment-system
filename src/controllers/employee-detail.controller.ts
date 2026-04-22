import { NextFunction, Request, Response } from 'express';
import { EmployeeDetailService } from '../services/employee-detail.service';
import { getOrm } from '../utils/orm-selector';
import { successResponse } from '../utils/response';

const service = new EmployeeDetailService();

export const createEmployeeDetail = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(201).json(successResponse('Employee detail created successfully', await service.create(getOrm(req), req.body))); }
  catch (error) { next(error); }
};

export const getEmployeeDetails = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(200).json(successResponse('Employee details fetched successfully', await service.findAll(getOrm(req)))); }
  catch (error) { next(error); }
};

export const getEmployeeDetailById = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(200).json(successResponse('Employee detail fetched successfully', await service.findById(getOrm(req), Number(req.params.id)))); }
  catch (error) { next(error); }
};

export const updateEmployeeDetail = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(200).json(successResponse('Employee detail updated successfully', await service.update(getOrm(req), Number(req.params.id), req.body))); }
  catch (error) { next(error); }
};

export const deleteEmployeeDetail = async (req: Request, res: Response, next: NextFunction) => {
  try { await service.delete(getOrm(req), Number(req.params.id)); res.status(200).json(successResponse('Employee detail deleted successfully')); }
  catch (error) { next(error); }
};
