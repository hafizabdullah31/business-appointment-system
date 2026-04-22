import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/sequelize.config';

export class Appointment extends Model {}

Appointment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    clientId: { type: DataTypes.INTEGER, allowNull: false, field: 'client_id' },
    employeeId: { type: DataTypes.INTEGER, allowNull: false, field: 'employee_id' },
    businessId: { type: DataTypes.INTEGER, allowNull: false, field: 'business_id' },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    scheduledAt: { type: DataTypes.DATE, allowNull: false, field: 'scheduled_at' },
    status: { type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'), allowNull: false, defaultValue: 'PENDING' },
    createdBy: { type: DataTypes.STRING, allowNull: false, field: 'created_by' },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'updated_at' },
    deletedAt: { type: DataTypes.DATE, allowNull: true, field: 'deleted_at' },
  },
  { sequelize, tableName: 'appointments', paranoid: true, timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', deletedAt: 'deleted_at' },
);
