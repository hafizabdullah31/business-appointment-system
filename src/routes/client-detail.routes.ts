import { Router } from 'express';
import {
  createClientDetail,
  deleteClientDetail,
  getClientDetailById,
  getClientDetails,
  updateClientDetail,
} from '../controllers/client-detail.controller';
import { authenticate, authorizeRoles, validateSession } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { clientDetailSchema } from '../types/validation';

const router = Router();

router.post('/', authenticate, validateSession, authorizeRoles('admin', 'client'), validate(clientDetailSchema), createClientDetail);
router.get('/', authenticate, validateSession, authorizeRoles('admin', 'client'), getClientDetails);
router.get('/:id', authenticate, validateSession, authorizeRoles('admin', 'client'), getClientDetailById);
router.put('/:id', authenticate, validateSession, authorizeRoles('admin', 'client'), validate(clientDetailSchema.partial()), updateClientDetail);
router.delete('/:id', authenticate, validateSession, authorizeRoles('admin'), deleteClientDetail);

export default router;
