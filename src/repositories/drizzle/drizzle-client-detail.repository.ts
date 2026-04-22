import { eq } from 'drizzle-orm';
import { db } from '../../config/db.config';
import { clientDetails } from '../../db/drizzle/schema';
import { IClientDetailRepository } from '../interfaces/IClientDetailRepository';

export class DrizzleClientDetailRepository implements IClientDetailRepository {
  async findAll(): Promise<any[]> { return db.select().from(clientDetails); }
  async findById(id: number): Promise<any | null> {
    const result = await db.select().from(clientDetails).where(eq(clientDetails.id, id)).limit(1);
    return result[0] || null;
  }
  async create(data: any): Promise<any> {
    const result = await db.insert(clientDetails).values(data).returning();
    return result[0];
  }
  async update(id: number, data: any): Promise<any> {
    const result = await db.update(clientDetails).set({ ...data, updatedAt: new Date() }).where(eq(clientDetails.id, id)).returning();
    return result[0];
  }
  async delete(id: number): Promise<void> { await db.delete(clientDetails).where(eq(clientDetails.id, id)); }
}
