import { NextFunction, Request, Response } from 'express';
import { BusinessService } from '../services/business.service';
import { getOrm } from '../utils/orm-selector';
import { successResponse } from '../utils/response';

const businessService = new BusinessService();

export const createBusiness = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const business = await businessService.create(getOrm(req), req.body);
    res.status(201).json(successResponse('Business created successfully', business));
  } catch (error) { next(error); }
};

export const getBusinesses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const businesses = await businessService.findAll(getOrm(req));
    res.status(200).json(successResponse('Businesses fetched successfully', businesses));
  } catch (error) { next(error); }
};

export const getBusinessById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const business = await businessService.findById(getOrm(req), Number(req.params.id));
    res.status(200).json(successResponse('Business fetched successfully', business));
  } catch (error) { next(error); }
};

export const updateBusiness = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const business = await businessService.update(getOrm(req), Number(req.params.id), req.body);
    res.status(200).json(successResponse('Business updated successfully', business));
  } catch (error) { next(error); }
};

export const deleteBusiness = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await businessService.delete(getOrm(req), Number(req.params.id));
    res.status(200).json(successResponse('Business deleted successfully'));
  } catch (error) { next(error); }
};
