import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/sequelize.config';

export class AppointmentHistory extends Model {}

AppointmentHistory.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    appointmentId: { type: DataTypes.INTEGER, allowNull: false, field: 'appointment_id' },
    action: { type: DataTypes.STRING, allowNull: false },
    performedBy: { type: DataTypes.INTEGER, allowNull: false, field: 'performed_by' },
    notes: { type: DataTypes.TEXT, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'created_at' },
  },
  { sequelize, tableName: 'appointment_history', timestamps: false },
);
