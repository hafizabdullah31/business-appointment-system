import bcrypt from 'bcryptjs';
import { db } from '../../config/db.config';
import {
  appointments,
  businesses,
  clientDetails,
  employeeDetails,
  users,
} from './schema';

async function seed() {
  const hashed = await bcrypt.hash('password123', 10);

  const [admin] = await db.insert(users).values({
    name: 'Admin User',
    email: 'admin@example.com',
    password: hashed,
    role: 'admin',
    businessId: null,
  }).returning();

  const [business] = await db.insert(businesses).values({
    name: 'Acme Salon',
    description: 'Main branch',
    ownerId: admin.id,
  }).returning();

  const [employee1, employee2] = await db.insert(users).values([
    { name: 'Employee One', email: 'employee1@example.com', password: hashed, role: 'employee', businessId: business.id },
    { name: 'Employee Two', email: 'employee2@example.com', password: hashed, role: 'employee', businessId: business.id },
  ]).returning();

  const [client1, client2] = await db.insert(users).values([
    { name: 'Client One', email: 'client1@example.com', password: hashed, role: 'client', businessId: business.id },
    { name: 'Client Two', email: 'client2@example.com', password: hashed, role: 'client', businessId: business.id },
  ]).returning();

  await db.insert(employeeDetails).values([
    { userId: employee1.id, businessId: business.id, position: 'Stylist' },
    { userId: employee2.id, businessId: business.id, position: 'Manager' },
  ]);

  await db.insert(clientDetails).values([
    { userId: client1.id, phone: '111-111-1111', address: 'Client Street 1' },
    { userId: client2.id, phone: '222-222-2222', address: 'Client Street 2' },
  ]);

  await db.insert(appointments).values([
    {
      clientId: client1.id,
      employeeId: employee1.id,
      businessId: business.id,
      title: 'Haircut',
      description: 'Basic haircut',
      scheduledAt: new Date(Date.now() + 86400000),
      status: 'PENDING',
      createdBy: 'client',
    },
    {
      clientId: client2.id,
      employeeId: employee2.id,
      businessId: business.id,
      title: 'Consultation',
      description: 'Style consultation',
      scheduledAt: new Date(Date.now() + 172800000),
      status: 'APPROVED',
      createdBy: 'employee',
    },
    {
      clientId: client1.id,
      employeeId: employee2.id,
      businessId: business.id,
      title: 'Follow-up',
      description: 'Post-service follow-up',
      scheduledAt: new Date(Date.now() + 259200000),
      status: 'PENDING',
      createdBy: 'client',
    },
  ]);

  console.log('Drizzle seed completed');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Drizzle seed failed', error);
  process.exit(1);
});
