import { NextFunction, Request, Response } from 'express';
import { AppointmentService } from '../services/appointment.service';
import { getOrm } from '../utils/orm-selector';
import { successResponse } from '../utils/response';

const service = new AppointmentService();

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.create(getOrm(req), req.body, req.user!.id, req.user!.role);
    res.status(201).json(successResponse('Appointment created successfully', data));
  } catch (error) { next(error); }
};

export const getAppointments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.findAll(getOrm(req), req.user!);
    res.status(200).json(successResponse('Appointments fetched successfully', data));
  } catch (error) { next(error); }
};

export const getAppointmentById = async (req: Request, res: Response, next: NextFunction) => {
  try { res.status(200).json(successResponse('Appointment fetched successfully', await service.findById(getOrm(req), Number(req.params.id)))); }
  catch (error) { next(error); }
};

export const approveAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.approve(getOrm(req), Number(req.params.id), req.user!.id, req.user!.role, req.body.notes);
    res.status(200).json(successResponse('Appointment approved successfully', data));
  } catch (error) { next(error); }
};

export const rejectAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.reject(getOrm(req), Number(req.params.id), req.user!.id, req.user!.role, req.body.notes);
    res.status(200).json(successResponse('Appointment rejected successfully', data));
  } catch (error) { next(error); }
};

export const completeAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.complete(getOrm(req), Number(req.params.id), req.user!.id, req.user!.role, req.body.notes);
    res.status(200).json(successResponse('Appointment completed successfully', data));
  } catch (error) { next(error); }
};

export const deleteAppointment = async (req: Request, res: Response, next: NextFunction) => {
  try { await service.delete(getOrm(req), Number(req.params.id)); res.status(200).json(successResponse('Appointment deleted successfully')); }
  catch (error) { next(error); }
};
