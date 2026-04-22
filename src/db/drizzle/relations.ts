import { relations } from 'drizzle-orm';
import {
  appointmentHistory,
  appointments,
  businesses,
  businessDetails,
  clientDetails,
  employeeDetails,
  refreshTokens,
  sessions,
  users,
} from './schema';

export const businessesRelations = relations(businesses, ({ many }) => ({
  users: many(users),
  employeeDetails: many(employeeDetails),
  appointments: many(appointments),
  details: many(businessDetails),
}));

export const usersRelations = relations(users, ({ many, one }) => ({
  business: one(businesses, { fields: [users.businessId], references: [businesses.id] }),
  employeeDetails: many(employeeDetails),
  clientDetails: many(clientDetails),
  clientAppointments: many(appointments, { relationName: 'clientAppointments' }),
  employeeAppointments: many(appointments, { relationName: 'employeeAppointments' }),
  refreshTokens: many(refreshTokens),
  sessions: many(sessions),
}));

export const employeeDetailsRelations = relations(employeeDetails, ({ one }) => ({
  user: one(users, { fields: [employeeDetails.userId], references: [users.id] }),
  business: one(businesses, { fields: [employeeDetails.businessId], references: [businesses.id] }),
}));

export const clientDetailsRelations = relations(clientDetails, ({ one }) => ({
  user: one(users, { fields: [clientDetails.userId], references: [users.id] }),
}));

export const businessDetailsRelations = relations(businessDetails, ({ one }) => ({
  business: one(businesses, { fields: [businessDetails.businessId], references: [businesses.id] }),
}));

export const appointmentsRelations = relations(appointments, ({ one, many }) => ({
  client: one(users, { fields: [appointments.clientId], references: [users.id], relationName: 'clientAppointments' }),
  employee: one(users, { fields: [appointments.employeeId], references: [users.id], relationName: 'employeeAppointments' }),
  business: one(businesses, { fields: [appointments.businessId], references: [businesses.id] }),
  history: many(appointmentHistory),
}));

export const appointmentHistoryRelations = relations(appointmentHistory, ({ one }) => ({
  appointment: one(appointments, { fields: [appointmentHistory.appointmentId], references: [appointments.id] }),
  user: one(users, { fields: [appointmentHistory.performedBy], references: [users.id] }),
}));

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
  user: one(users, { fields: [refreshTokens.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));
