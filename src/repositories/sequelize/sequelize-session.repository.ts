import { models } from '../../models/sequelize';
import { ISessionRepository } from '../interfaces/ISessionRepository';

export class SequelizeSessionRepository implements ISessionRepository {
  async findAll(): Promise<any[]> { return models.Session.findAll(); }
  async findById(id: number): Promise<any | null> { return models.Session.findByPk(id); }
  async findBySessionToken(sessionToken: string): Promise<any | null> { return models.Session.findOne({ where: { sessionToken } }); }
  async create(data: any): Promise<any> { return models.Session.create(data); }
  async update(id: number, data: any): Promise<any> {
    await models.Session.update(data, { where: { id } });
    return this.findById(id);
  }
  async delete(id: number): Promise<void> { await models.Session.destroy({ where: { id } }); }
  async deleteBySessionToken(sessionToken: string): Promise<void> { await models.Session.destroy({ where: { sessionToken } }); }
}
