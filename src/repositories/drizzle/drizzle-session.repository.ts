import { eq } from 'drizzle-orm';
import { db } from '../../config/db.config';
import { sessions } from '../../db/drizzle/schema';
import { ISessionRepository } from '../interfaces/ISessionRepository';

export class DrizzleSessionRepository implements ISessionRepository {
  async findAll(): Promise<any[]> { return db.select().from(sessions); }
  async findById(id: number): Promise<any | null> {
    const result = await db.select().from(sessions).where(eq(sessions.id, id)).limit(1);
    return result[0] || null;
  }
  async findBySessionToken(sessionToken: string): Promise<any | null> {
    const result = await db.select().from(sessions).where(eq(sessions.sessionToken, sessionToken)).limit(1);
    return result[0] || null;
  }
  async create(data: any): Promise<any> {
    const result = await db.insert(sessions).values(data).returning();
    return result[0];
  }
  async update(id: number, data: any): Promise<any> {
    const result = await db.update(sessions).set(data).where(eq(sessions.id, id)).returning();
    return result[0];
  }
  async delete(id: number): Promise<void> { await db.delete(sessions).where(eq(sessions.id, id)); }
  async deleteBySessionToken(sessionToken: string): Promise<void> { await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken)); }
}
