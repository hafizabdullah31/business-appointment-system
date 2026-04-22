import { models } from '../../models/sequelize';
import { IRefreshTokenRepository } from '../interfaces/IRefreshTokenRepository';

export class SequelizeRefreshTokenRepository implements IRefreshTokenRepository {
  async findAll(): Promise<any[]> { return models.RefreshToken.findAll(); }
  async findById(id: number): Promise<any | null> { return models.RefreshToken.findByPk(id); }
  async findByToken(token: string): Promise<any | null> { return models.RefreshToken.findOne({ where: { token } }); }
  async create(data: any): Promise<any> { return models.RefreshToken.create(data); }
  async update(id: number, data: any): Promise<any> {
    await models.RefreshToken.update(data, { where: { id } });
    return this.findById(id);
  }
  async delete(id: number): Promise<void> { await models.RefreshToken.destroy({ where: { id } }); }
  async deleteByToken(token: string): Promise<void> { await models.RefreshToken.destroy({ where: { token } }); }
}
