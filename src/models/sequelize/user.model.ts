import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/sequelize.config';

export class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'employee', 'client'), allowNull: false },
    businessId: { type: DataTypes.INTEGER, allowNull: true, field: 'business_id' },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'updated_at' },
    deletedAt: { type: DataTypes.DATE, allowNull: true, field: 'deleted_at' },
  },
  { sequelize, tableName: 'users', paranoid: true, timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', deletedAt: 'deleted_at' },
);
