import { models } from '../../models/sequelize';
import { IClientDetailRepository } from '../interfaces/IClientDetailRepository';

export class SequelizeClientDetailRepository implements IClientDetailRepository {
  async findAll(): Promise<any[]> { return models.ClientDetail.findAll(); }
  async findById(id: number): Promise<any | null> { return models.ClientDetail.findByPk(id); }
  async create(data: any): Promise<any> { return models.ClientDetail.create(data); }
  async update(id: number, data: any): Promise<any> {
    await models.ClientDetail.update(data, { where: { id } });
    return this.findById(id);
  }
  async delete(id: number): Promise<void> { await models.ClientDetail.destroy({ where: { id } }); }
}
