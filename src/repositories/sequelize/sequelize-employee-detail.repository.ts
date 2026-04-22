import { models } from '../../models/sequelize';
import { IEmployeeDetailRepository } from '../interfaces/IEmployeeDetailRepository';

export class SequelizeEmployeeDetailRepository implements IEmployeeDetailRepository {
  async findAll(): Promise<any[]> { return models.EmployeeDetail.findAll(); }
  async findById(id: number): Promise<any | null> { return models.EmployeeDetail.findByPk(id); }
  async create(data: any): Promise<any> { return models.EmployeeDetail.create(data); }
  async update(id: number, data: any): Promise<any> {
    await models.EmployeeDetail.update(data, { where: { id } });
    return this.findById(id);
  }
  async delete(id: number): Promise<void> { await models.EmployeeDetail.destroy({ where: { id } }); }
}
