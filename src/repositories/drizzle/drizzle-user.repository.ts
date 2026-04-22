import { and, eq, isNull } from 'drizzle-orm';
import { db } from '../../config/db.config';
import { users } from '../../db/drizzle/schema';
import { IUserRepository } from '../interfaces/IUserRepository';

export class DrizzleUserRepository implements IUserRepository {
  async findAll(): Promise<any[]> {
    return db.select().from(users).where(isNull(users.deletedAt));
  }

  async findById(id: number): Promise<any | null> {
    const result = await db.select().from(users).where(and(eq(users.id, id), isNull(users.deletedAt))).limit(1);
    return result[0] || null;
  }

  async findByEmail(email: string): Promise<any | null> {
    const result = await db.select().from(users).where(and(eq(users.email, email), isNull(users.deletedAt))).limit(1);
    return result[0] || null;
  }

  async create(data: any): Promise<any> {
    const result = await db.insert(users).values(data).returning();
    return result[0];
  }

  async update(id: number, data: any): Promise<any> {
    const result = await db.update(users).set({ ...data, updatedAt: new Date() }).where(eq(users.id, id)).returning();
    return result[0];
  }

  async delete(id: number): Promise<void> {
    await db.update(users).set({ deletedAt: new Date() }).where(eq(users.id, id));
  }
}
