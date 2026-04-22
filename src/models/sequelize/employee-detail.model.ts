import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/sequelize.config';

export class EmployeeDetail extends Model {}

EmployeeDetail.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
    businessId: { type: DataTypes.INTEGER, allowNull: false, field: 'business_id' },
    position: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'updated_at' },
  },
  { sequelize, tableName: 'employee_details', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' },
);
