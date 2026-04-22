import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../config/sequelize.config';

export class Session extends Model {}

Session.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
    sessionToken: { type: DataTypes.TEXT, allowNull: false, field: 'session_token' },
    expiresAt: { type: DataTypes.DATE, allowNull: false, field: 'expires_at' },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'created_at' },
  },
  { sequelize, tableName: 'sessions', timestamps: false },
);
