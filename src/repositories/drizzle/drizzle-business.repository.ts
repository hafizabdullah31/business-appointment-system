import { and, eq, isNull } from 'drizzle-orm';
import { db } from '../../config/db.config';
import { businesses } from '../../db/drizzle/schema';
import { IBusinessRepository } from '../interfaces/IBusinessRepository';

export class DrizzleBusinessRepository implements IBusinessRepository {
  async findAll(): Promise<any[]> {
    return db.select().from(businesses).where(isNull(businesses.deletedAt));
  }

  async findById(id: number): Promise<any | null> {
    const result = await db.select().from(businesses).where(and(eq(businesses.id, id), isNull(businesses.deletedAt))).limit(1);
    return result[0] || null;
  }

  async create(data: any): Promise<any> {
    const result = await db.insert(businesses).values(data).returning();
    return result[0];
  }

  async update(id: number, data: any): Promise<any> {
    const result = await db.update(businesses).set({ ...data, updatedAt: new Date() }).where(eq(businesses.id, id)).returning();
    return result[0];
  }

  async delete(id: number): Promise<void> {
    await db.update(businesses).set({ deletedAt: new Date() }).where(eq(businesses.id, id));
  }
}
