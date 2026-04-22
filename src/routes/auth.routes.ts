import { Router } from 'express';
import { login, logout, refresh, register } from '../controllers/auth.controller';
import { authenticate, validateSession } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { loginSchema, logoutSchema, refreshSchema, registerSchema } from '../types/validation';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', validate(refreshSchema), refresh);
router.post('/logout', authenticate, validateSession, validate(logoutSchema), logout);

export default router;
