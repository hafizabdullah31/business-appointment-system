import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/sequelize.config';

export class Business extends Model {}

Business.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    ownerId: { type: DataTypes.INTEGER, allowNull: false, field: 'owner_id' },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'updated_at' },
    deletedAt: { type: DataTypes.DATE, allowNull: true, field: 'deleted_at' },
  },
  { sequelize, tableName: 'businesses', paranoid: true, timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', deletedAt: 'deleted_at' },
);
