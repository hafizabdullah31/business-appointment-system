import { IUserRepository } from '../interfaces/IUserRepository';
import { models } from '../../models/sequelize';

export class SequelizeUserRepository implements IUserRepository {
  async findAll(): Promise<any[]> { return models.User.findAll(); }
  async findById(id: number): Promise<any | null> { return models.User.findByPk(id); }
  async findByEmail(email: string): Promise<any | null> { return models.User.findOne({ where: { email } }); }
  async create(data: any): Promise<any> { return models.User.create(data); }
  async update(id: number, data: any): Promise<any> {
    await models.User.update(data, { where: { id } });
    return this.findById(id);
  }
  async delete(id: number): Promise<void> { await models.User.destroy({ where: { id } }); }
}
