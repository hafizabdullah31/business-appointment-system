import { Router } from 'express';
import {
  createBusiness,
  deleteBusiness,
  getBusinessById,
  getBusinesses,
  updateBusiness,
} from '../controllers/business.controller';
import { authenticate, authorizeRoles, validateSession } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { businessSchema } from '../types/validation';

const router = Router();

router.post('/', authenticate, validateSession, authorizeRoles('admin'), validate(businessSchema), createBusiness);
router.get('/', authenticate, validateSession, authorizeRoles('admin', 'employee', 'client'), getBusinesses);
router.get('/:id', authenticate, validateSession, authorizeRoles('admin', 'employee', 'client'), getBusinessById);
router.put('/:id', authenticate, validateSession, authorizeRoles('admin'), validate(businessSchema.partial()), updateBusiness);
router.delete('/:id', authenticate, validateSession, authorizeRoles('admin'), deleteBusiness);

export default router;
