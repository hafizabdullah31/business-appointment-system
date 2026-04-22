import { models } from '../../models/sequelize';
import { IAppointmentHistoryRepository } from '../interfaces/IAppointmentHistoryRepository';

export class SequelizeAppointmentHistoryRepository implements IAppointmentHistoryRepository {
  async findAll(): Promise<any[]> { return models.AppointmentHistory.findAll(); }
  async findById(id: number): Promise<any | null> { return models.AppointmentHistory.findByPk(id); }
  async create(data: any): Promise<any> { return models.AppointmentHistory.create(data); }
  async update(id: number, data: any): Promise<any> {
    await models.AppointmentHistory.update(data, { where: { id } });
    return this.findById(id);
  }
  async delete(id: number): Promise<void> { await models.AppointmentHistory.destroy({ where: { id } }); }
}
