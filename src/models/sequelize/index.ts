import { sequelize } from '../../config/sequelize.config';
import { AppointmentHistory } from './appointment-history.model';
import { Appointment } from './appointment.model';
import { BusinessDetail } from './business-detail.model';
import { Business } from './business.model';
import { ClientDetail } from './client-detail.model';
import { EmployeeDetail } from './employee-detail.model';
import { RefreshToken } from './refresh-token.model';
import { Session } from './session.model';
import { User } from './user.model';

User.belongsTo(Business, { foreignKey: 'businessId', as: 'business', constraints: false });
Business.hasMany(User, { foreignKey: 'businessId', as: 'users', constraints: false });

EmployeeDetail.belongsTo(User, { foreignKey: 'userId', as: 'user', constraints: false });
EmployeeDetail.belongsTo(Business, { foreignKey: 'businessId', as: 'business', constraints: false });
User.hasMany(EmployeeDetail, { foreignKey: 'userId', as: 'employeeDetails', constraints: false });
Business.hasMany(EmployeeDetail, { foreignKey: 'businessId', as: 'employeeDetails', constraints: false });

ClientDetail.belongsTo(User, { foreignKey: 'userId', as: 'user', constraints: false });
User.hasMany(ClientDetail, { foreignKey: 'userId', as: 'clientDetails', constraints: false });

BusinessDetail.belongsTo(Business, { foreignKey: 'businessId', as: 'business', constraints: false });
Business.hasMany(BusinessDetail, { foreignKey: 'businessId', as: 'details', constraints: false });

Appointment.belongsTo(User, { foreignKey: 'clientId', as: 'client', constraints: false });
Appointment.belongsTo(User, { foreignKey: 'employeeId', as: 'employee', constraints: false });
Appointment.belongsTo(Business, { foreignKey: 'businessId', as: 'business', constraints: false });
User.hasMany(Appointment, { foreignKey: 'clientId', as: 'clientAppointments', constraints: false });
User.hasMany(Appointment, { foreignKey: 'employeeId', as: 'employeeAppointments', constraints: false });
Business.hasMany(Appointment, { foreignKey: 'businessId', as: 'appointments', constraints: false });

AppointmentHistory.belongsTo(Appointment, { foreignKey: 'appointmentId', as: 'appointment', constraints: false });
Appointment.hasMany(AppointmentHistory, { foreignKey: 'appointmentId', as: 'history', constraints: false });

RefreshToken.belongsTo(User, { foreignKey: 'userId', as: 'user', constraints: false });
User.hasMany(RefreshToken, { foreignKey: 'userId', as: 'refreshTokens', constraints: false });

Session.belongsTo(User, { foreignKey: 'userId', as: 'user', constraints: false });
User.hasMany(Session, { foreignKey: 'userId', as: 'sessions', constraints: false });

export const models = {
  sequelize,
  Business,
  User,
  EmployeeDetail,
  ClientDetail,
  BusinessDetail,
  Appointment,
  AppointmentHistory,
  RefreshToken,
  Session,
};
