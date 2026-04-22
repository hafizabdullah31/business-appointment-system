import { repositoryFactory, OrmType } from '../repositories/repository.factory';
import { AppError } from '../utils/app-error';
import { logger } from '../utils/logger';

export class AppointmentService {
  getRepository(orm: OrmType) {
    return repositoryFactory.appointment(orm);
  }

  private getHistoryRepository(orm: OrmType) {
    return repositoryFactory.appointmentHistory(orm);
  }

  async create(orm: OrmType, data: any, performedBy: number, performedByRole: string) {
    if (!['client', 'employee'].includes(data.createdBy)) {
      throw new AppError('createdBy must be client or employee', 400);
    }
    if (performedByRole !== 'admin' && performedByRole !== data.createdBy) {
      throw new AppError('createdBy must match your role', 400);
    }

    const appointment = await this.getRepository(orm).create({
      ...data,
      scheduledAt: new Date(data.scheduledAt),
      status: 'PENDING',
    });

    const appointmentData = appointment.dataValues || appointment;
    await this.getHistoryRepository(orm).create({
      appointmentId: appointmentData.id,
      action: 'created',
      performedBy,
      notes: data.description || 'Appointment created',
      createdAt: new Date(),
    });

    logger.info('Appointment created', { appointmentId: appointmentData.id, performedBy });
    return appointment;
  }

  async findAll(orm: OrmType, user: any) {
    return this.getRepository(orm).findAll({ userId: user.id, role: user.role });
  }

  async findById(orm: OrmType, id: number) {
    const appointment = await this.getRepository(orm).findById(id);
    if (!appointment) throw new AppError('Appointment not found', 404);
    return appointment;
  }

  private canOppositePartyAct(appointment: any, role: string) {
    if (role === 'admin') return true;
    if (appointment.createdBy === 'client' && role === 'employee') return true;
    if (appointment.createdBy === 'employee' && role === 'client') return true;
    return false;
  }

  private async updateStatus(
    orm: OrmType,
    id: number,
    nextStatus: 'APPROVED' | 'REJECTED' | 'COMPLETED',
    action: 'approved' | 'rejected' | 'completed',
    performedBy: number,
    role: string,
    notes?: string,
  ) {
    const found = await this.findById(orm, id);
    const appointment = found.dataValues || found;

    if (nextStatus !== 'COMPLETED') {
      if (appointment.status !== 'PENDING') throw new AppError('Only pending appointments can be approved/rejected', 400);
      if (!this.canOppositePartyAct(appointment, role)) throw new AppError('You are not allowed to perform this action', 403);
    }

    if (nextStatus === 'COMPLETED' && appointment.status !== 'APPROVED') {
      throw new AppError('Only approved appointments can be completed', 400);
    }

    const updated = await this.getRepository(orm).update(id, { status: nextStatus });

    await this.getHistoryRepository(orm).create({
      appointmentId: id,
      action,
      performedBy,
      notes: notes || `${action} by user ${performedBy}`,
      createdAt: new Date(),
    });

    logger.info(`Appointment ${action}`, { appointmentId: id, performedBy });
    return updated;
  }

  async approve(orm: OrmType, id: number, performedBy: number, role: string, notes?: string) {
    return this.updateStatus(orm, id, 'APPROVED', 'approved', performedBy, role, notes);
  }

  async reject(orm: OrmType, id: number, performedBy: number, role: string, notes?: string) {
    return this.updateStatus(orm, id, 'REJECTED', 'rejected', performedBy, role, notes);
  }

  async complete(orm: OrmType, id: number, performedBy: number, role: string, notes?: string) {
    if (!['admin', 'employee'].includes(role)) throw new AppError('Only admin or employee can complete appointment', 403);
    return this.updateStatus(orm, id, 'COMPLETED', 'completed', performedBy, role, notes);
  }

  async delete(orm: OrmType, id: number) {
    await this.findById(orm, id);
    await this.getRepository(orm).delete(id);
  }
}
