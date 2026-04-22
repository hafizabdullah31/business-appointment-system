import { eq } from 'drizzle-orm';
import { db } from '../../config/db.config';
import { employeeDetails } from '../../db/drizzle/schema';
import { IEmployeeDetailRepository } from '../interfaces/IEmployeeDetailRepository';

export class DrizzleEmployeeDetailRepository implements IEmployeeDetailRepository {
  async findAll(): Promise<any[]> { return db.select().from(employeeDetails); }
  async findById(id: number): Promise<any | null> {
    const result = await db.select().from(employeeDetails).where(eq(employeeDetails.id, id)).limit(1);
    return result[0] || null;
  }
  async create(data: any): Promise<any> {
    const result = await db.insert(employeeDetails).values(data).returning();
    return result[0];
  }
  async update(id: number, data: any): Promise<any> {
    const result = await db.update(employeeDetails).set({ ...data, updatedAt: new Date() }).where(eq(employeeDetails.id, id)).returning();
    return result[0];
  }
  async delete(id: number): Promise<void> { await db.delete(employeeDetails).where(eq(employeeDetails.id, id)); }
}
