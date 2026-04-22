import { and, eq, isNull } from 'drizzle-orm';
import { db } from '../../config/db.config';
import { appointments } from '../../db/drizzle/schema';
import { IAppointmentRepository } from '../interfaces/IAppointmentRepository';

export class DrizzleAppointmentRepository implements IAppointmentRepository {
  async findAll(filters?: any): Promise<any[]> {
    if (filters?.userId && filters?.role === 'client') {
      return db.select().from(appointments).where(and(eq(appointments.clientId, Number(filters.userId)), isNull(appointments.deletedAt)));
    }

    if (filters?.userId && filters?.role === 'employee') {
      return db.select().from(appointments).where(and(eq(appointments.employeeId, Number(filters.userId)), isNull(appointments.deletedAt)));
    }

    return db.select().from(appointments).where(isNull(appointments.deletedAt));
  }

  async findById(id: number): Promise<any | null> {
    const result = await db.select().from(appointments).where(and(eq(appointments.id, id), isNull(appointments.deletedAt))).limit(1);
    return result[0] || null;
  }

  async create(data: any): Promise<any> {
    const result = await db.insert(appointments).values(data).returning();
    return result[0];
  }

  async update(id: number, data: any): Promise<any> {
    const result = await db.update(appointments).set({ ...data, updatedAt: new Date() }).where(eq(appointments.id, id)).returning();
    return result[0];
  }

  async delete(id: number): Promise<void> {
    await db.update(appointments).set({ deletedAt: new Date() }).where(eq(appointments.id, id));
  }
}
