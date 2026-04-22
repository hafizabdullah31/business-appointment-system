import { models } from '../../models/sequelize';
import { IAppointmentRepository } from '../interfaces/IAppointmentRepository';

export class SequelizeAppointmentRepository implements IAppointmentRepository {
  async findAll(filters?: any): Promise<any[]> {
    if (filters?.userId && filters?.role === 'client') {
      return models.Appointment.findAll({ where: { clientId: filters.userId } });
    }
    if (filters?.userId && filters?.role === 'employee') {
      return models.Appointment.findAll({ where: { employeeId: filters.userId } });
    }
    return models.Appointment.findAll();
  }

  async findById(id: number): Promise<any | null> { return models.Appointment.findByPk(id); }
  async create(data: any): Promise<any> { return models.Appointment.create(data); }
  async update(id: number, data: any): Promise<any> {
    await models.Appointment.update(data, { where: { id } });
    return this.findById(id);
  }
  async delete(id: number): Promise<void> { await models.Appointment.destroy({ where: { id } }); }
}
