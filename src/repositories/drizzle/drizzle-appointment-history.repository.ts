import { eq } from 'drizzle-orm';
import { db } from '../../config/db.config';
import { appointmentHistory } from '../../db/drizzle/schema';
import { IAppointmentHistoryRepository } from '../interfaces/IAppointmentHistoryRepository';

export class DrizzleAppointmentHistoryRepository implements IAppointmentHistoryRepository {
  async findAll(): Promise<any[]> { return db.select().from(appointmentHistory); }
  async findById(id: number): Promise<any | null> {
    const result = await db.select().from(appointmentHistory).where(eq(appointmentHistory.id, id)).limit(1);
    return result[0] || null;
  }
  async create(data: any): Promise<any> {
    const result = await db.insert(appointmentHistory).values(data).returning();
    return result[0];
  }
  async update(id: number, data: any): Promise<any> {
    const result = await db.update(appointmentHistory).set(data).where(eq(appointmentHistory.id, id)).returning();
    return result[0];
  }
  async delete(id: number): Promise<void> { await db.delete(appointmentHistory).where(eq(appointmentHistory.id, id)); }
}
