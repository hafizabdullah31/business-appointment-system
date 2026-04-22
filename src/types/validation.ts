import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'employee', 'client']),
  businessId: z.number().int().optional().nullable(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export const logoutSchema = z.object({
  refreshToken: z.string().optional(),
  sessionToken: z.string().optional(),
});

export const businessSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  ownerId: z.number().int(),
});

export const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['admin', 'employee', 'client']),
  businessId: z.number().int().nullable().optional(),
});

export const userUpdateSchema = userSchema.partial();

export const employeeDetailSchema = z.object({
  userId: z.number().int(),
  businessId: z.number().int(),
  position: z.string().min(2),
});

export const clientDetailSchema = z.object({
  userId: z.number().int(),
  phone: z.string().min(3),
  address: z.string().min(3),
});

export const appointmentSchema = z.object({
  clientId: z.number().int(),
  employeeId: z.number().int(),
  businessId: z.number().int(),
  title: z.string().min(2),
  description: z.string().optional(),
  scheduledAt: z.string().datetime(),
  createdBy: z.enum(['client', 'employee']),
});

export const actionSchema = z.object({
  notes: z.string().optional(),
});
