import { NextFunction, Request, Response } from 'express';
import { ClientDetailService } from '../services/client-detail.service';
import { getOrm } from '../utils/orm-selector';
import { successResponse } from '../utils/response';

const service = new ClientDetailService();

export const createClientDetail = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(201).json(successResponse('Client detail created successfully', await service.create(getOrm(req), req.body))); }
  catch (error) { next(error); }
};

export const getClientDetails = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(200).json(successResponse('Client details fetched successfully', await service.findAll(getOrm(req)))); }
  catch (error) { next(error); }
};

export const getClientDetailById = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(200).json(successResponse('Client detail fetched successfully', await service.findById(getOrm(req), Number(req.params.id)))); }
  catch (error) { next(error); }
};

export const updateClientDetail = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(200).json(successResponse('Client detail updated successfully', await service.update(getOrm(req), Number(req.params.id), req.body))); }
  catch (error) { next(error); }
};

export const deleteClientDetail = async (req: Request, res: Response, next: NextFunction) => {
  try { await service.delete(getOrm(req), Number(req.params.id)); res.status(200).json(successResponse('Client detail deleted successfully')); }
  catch (error) { next(error); }
};
