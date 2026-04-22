import { Router } from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/user.controller';
import { authenticate, authorizeRoles, validateSession } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { userSchema, userUpdateSchema } from '../types/validation';

const router = Router();

router.post('/', authenticate, validateSession, authorizeRoles('admin'), validate(userSchema), createUser);
router.get('/', authenticate, validateSession, authorizeRoles('admin'), getUsers);
router.get('/:id', authenticate, validateSession, authorizeRoles('admin', 'employee', 'client'), getUserById);
router.put('/:id', authenticate, validateSession, authorizeRoles('admin'), validate(userUpdateSchema), updateUser);
router.delete('/:id', authenticate, validateSession, authorizeRoles('admin'), deleteUser);

export default router;
