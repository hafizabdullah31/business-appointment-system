import { eq } from 'drizzle-orm';
import { db } from '../../config/db.config';
import { refreshTokens } from '../../db/drizzle/schema';
import { IRefreshTokenRepository } from '../interfaces/IRefreshTokenRepository';

export class DrizzleRefreshTokenRepository implements IRefreshTokenRepository {
  async findAll(): Promise<any[]> { return db.select().from(refreshTokens); }
  async findById(id: number): Promise<any | null> {
    const result = await db.select().from(refreshTokens).where(eq(refreshTokens.id, id)).limit(1);
    return result[0] || null;
  }
  async findByToken(token: string): Promise<any | null> {
    const result = await db.select().from(refreshTokens).where(eq(refreshTokens.token, token)).limit(1);
    return result[0] || null;
  }
  async create(data: any): Promise<any> {
    const result = await db.insert(refreshTokens).values(data).returning();
    return result[0];
  }
  async update(id: number, data: any): Promise<any> {
    const result = await db.update(refreshTokens).set(data).where(eq(refreshTokens.id, id)).returning();
    return result[0];
  }
  async delete(id: number): Promise<void> { await db.delete(refreshTokens).where(eq(refreshTokens.id, id)); }
  async deleteByToken(token: string): Promise<void> { await db.delete(refreshTokens).where(eq(refreshTokens.token, token)); }
}
