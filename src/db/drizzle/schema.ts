import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['admin', 'employee', 'client']);
export const appointmentStatusEnum = pgEnum('appointment_status', ['PENDING', 'APPROVED', 'REJECTED', 'COMPLETED']);

export const businesses = pgTable('businesses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  ownerId: integer('owner_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: userRoleEnum('role').notNull(),
  businessId: integer('business_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

export const employeeDetails = pgTable('employee_details', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  businessId: integer('business_id').notNull(),
  position: varchar('position', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const clientDetails = pgTable('client_details', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  address: text('address').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const businessDetails = pgTable('business_details', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  address: text('address').notNull(),
  website: varchar('website', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  clientId: integer('client_id').notNull(),
  employeeId: integer('employee_id').notNull(),
  businessId: integer('business_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  scheduledAt: timestamp('scheduled_at').notNull(),
  status: appointmentStatusEnum('status').default('PENDING').notNull(),
  createdBy: varchar('created_by', { length: 20 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

export const appointmentHistory = pgTable('appointment_history', {
  id: serial('id').primaryKey(),
  appointmentId: integer('appointment_id').notNull(),
  action: varchar('action', { length: 20 }).notNull(),
  performedBy: integer('performed_by').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const refreshTokens = pgTable('refresh_tokens', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  token: text('token').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  sessionToken: text('session_token').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
