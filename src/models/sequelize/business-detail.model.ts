import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/sequelize.config';

export class BusinessDetail extends Model {}

BusinessDetail.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    businessId: { type: DataTypes.INTEGER, allowNull: false, field: 'business_id' },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false },
    website: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'updated_at' },
  },
  { sequelize, tableName: 'business_details', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' },
);
