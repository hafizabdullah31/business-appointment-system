import { DrizzleAppointmentHistoryRepository } from './drizzle/drizzle-appointment-history.repository';
import { DrizzleAppointmentRepository } from './drizzle/drizzle-appointment.repository';
import { DrizzleBusinessRepository } from './drizzle/drizzle-business.repository';
import { DrizzleClientDetailRepository } from './drizzle/drizzle-client-detail.repository';
import { DrizzleEmployeeDetailRepository } from './drizzle/drizzle-employee-detail.repository';
import { DrizzleRefreshTokenRepository } from './drizzle/drizzle-refresh-token.repository';
import { DrizzleSessionRepository } from './drizzle/drizzle-session.repository';
import { DrizzleUserRepository } from './drizzle/drizzle-user.repository';
import { SequelizeAppointmentHistoryRepository } from './sequelize/sequelize-appointment-history.repository';
import { SequelizeAppointmentRepository } from './sequelize/sequelize-appointment.repository';
import { SequelizeBusinessRepository } from './sequelize/sequelize-business.repository';
import { SequelizeClientDetailRepository } from './sequelize/sequelize-client-detail.repository';
import { SequelizeEmployeeDetailRepository } from './sequelize/sequelize-employee-detail.repository';
import { SequelizeRefreshTokenRepository } from './sequelize/sequelize-refresh-token.repository';
import { SequelizeSessionRepository } from './sequelize/sequelize-session.repository';
import { SequelizeUserRepository } from './sequelize/sequelize-user.repository';

export type OrmType = 'drizzle' | 'sequelize';

export const repositoryFactory = {
  user: (orm: OrmType) => orm === 'drizzle' ? new DrizzleUserRepository() : new SequelizeUserRepository(),
  business: (orm: OrmType) => orm === 'drizzle' ? new DrizzleBusinessRepository() : new SequelizeBusinessRepository(),
  employeeDetail: (orm: OrmType) => orm === 'drizzle' ? new DrizzleEmployeeDetailRepository() : new SequelizeEmployeeDetailRepository(),
  clientDetail: (orm: OrmType) => orm === 'drizzle' ? new DrizzleClientDetailRepository() : new SequelizeClientDetailRepository(),
  appointment: (orm: OrmType) => orm === 'drizzle' ? new DrizzleAppointmentRepository() : new SequelizeAppointmentRepository(),
  appointmentHistory: (orm: OrmType) => orm === 'drizzle' ? new DrizzleAppointmentHistoryRepository() : new SequelizeAppointmentHistoryRepository(),
  refreshToken: (orm: OrmType) => orm === 'drizzle' ? new DrizzleRefreshTokenRepository() : new SequelizeRefreshTokenRepository(),
  session: (orm: OrmType) => orm === 'drizzle' ? new DrizzleSessionRepository() : new SequelizeSessionRepository(),
};
