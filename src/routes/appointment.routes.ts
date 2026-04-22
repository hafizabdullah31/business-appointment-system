import { Router } from 'express';
import {
  approveAppointment,
  completeAppointment,
  createAppointment,
  deleteAppointment,
  getAppointmentById,
  getAppointments,
  rejectAppointment,
} from '../controllers/appointment.controller';
import { authenticate, authorizeRoles, validateSession } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { actionSchema, appointmentSchema } from '../types/validation';

const router = Router();

router.post('/', authenticate, validateSession, authorizeRoles('admin', 'employee', 'client'), validate(appointmentSchema), createAppointment);
router.get('/', authenticate, validateSession, authorizeRoles('admin', 'employee', 'client'), getAppointments);
router.get('/:id', authenticate, validateSession, authorizeRoles('admin', 'employee', 'client'), getAppointmentById);
router.patch('/:id/approve', authenticate, validateSession, authorizeRoles('admin', 'employee', 'client'), validate(actionSchema), approveAppointment);
router.patch('/:id/reject', authenticate, validateSession, authorizeRoles('admin', 'employee', 'client'), validate(actionSchema), rejectAppointment);
router.patch('/:id/complete', authenticate, validateSession, authorizeRoles('admin', 'employee', 'client'), validate(actionSchema), completeAppointment);
router.delete('/:id', authenticate, validateSession, authorizeRoles('admin', 'employee'), deleteAppointment);

export default router;
