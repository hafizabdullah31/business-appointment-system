import { Router } from 'express';
import {
  createEmployeeDetail,
  deleteEmployeeDetail,
  getEmployeeDetailById,
  getEmployeeDetails,
  updateEmployeeDetail,
} from '../controllers/employee-detail.controller';
import { authenticate, authorizeRoles, validateSession } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { employeeDetailSchema } from '../types/validation';

const router = Router();

router.post('/', authenticate, validateSession, authorizeRoles('admin'), validate(employeeDetailSchema), createEmployeeDetail);
router.get('/', authenticate, validateSession, authorizeRoles('admin', 'employee'), getEmployeeDetails);
router.get('/:id', authenticate, validateSession, authorizeRoles('admin', 'employee'), getEmployeeDetailById);
router.put('/:id', authenticate, validateSession, authorizeRoles('admin'), validate(employeeDetailSchema.partial()), updateEmployeeDetail);
router.delete('/:id', authenticate, validateSession, authorizeRoles('admin'), deleteEmployeeDetail);

export default router;
