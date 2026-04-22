import { models } from '../../models/sequelize';
import { IBusinessRepository } from '../interfaces/IBusinessRepository';

export class SequelizeBusinessRepository implements IBusinessRepository {
  async findAll(): Promise<any[]> { return models.Business.findAll(); }
  async findById(id: number): Promise<any | null> { return models.Business.findByPk(id); }
  async create(data: any): Promise<any> { return models.Business.create(data); }
  async update(id: number, data: any): Promise<any> {
    await models.Business.update(data, { where: { id } });
    return this.findById(id);
  }
  async delete(id: number): Promise<void> { await models.Business.destroy({ where: { id } }); }
}
