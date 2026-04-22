'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const password = await bcrypt.hash('password123', 10);

    await queryInterface.bulkInsert('users', [{
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      password,
      role: 'admin',
      business_id: null,
      created_at: now,
      updated_at: now,
    }]);

    await queryInterface.bulkInsert('businesses', [{
      id: 1,
      name: 'Acme Salon',
      description: 'Main branch',
      owner_id: 1,
      created_at: now,
      updated_at: now,
    }]);

    await queryInterface.bulkInsert('users', [
      { id: 2, name: 'Employee One', email: 'employee1@example.com', password, role: 'employee', business_id: 1, created_at: now, updated_at: now },
      { id: 3, name: 'Employee Two', email: 'employee2@example.com', password, role: 'employee', business_id: 1, created_at: now, updated_at: now },
      { id: 4, name: 'Client One', email: 'client1@example.com', password, role: 'client', business_id: 1, created_at: now, updated_at: now },
      { id: 5, name: 'Client Two', email: 'client2@example.com', password, role: 'client', business_id: 1, created_at: now, updated_at: now },
    ]);

    await queryInterface.bulkInsert('employee_details', [
      { id: 1, user_id: 2, business_id: 1, position: 'Stylist', created_at: now, updated_at: now },
      { id: 2, user_id: 3, business_id: 1, position: 'Manager', created_at: now, updated_at: now },
    ]);

    await queryInterface.bulkInsert('client_details', [
      { id: 1, user_id: 4, phone: '111-111-1111', address: 'Client Street 1', created_at: now, updated_at: now },
      { id: 2, user_id: 5, phone: '222-222-2222', address: 'Client Street 2', created_at: now, updated_at: now },
    ]);

    await queryInterface.bulkInsert('appointments', [
      { id: 1, client_id: 4, employee_id: 2, business_id: 1, title: 'Haircut', description: 'Basic haircut', scheduled_at: new Date(now.getTime() + 86400000), status: 'PENDING', created_by: 'client', created_at: now, updated_at: now },
      { id: 2, client_id: 5, employee_id: 3, business_id: 1, title: 'Consultation', description: 'Style consultation', scheduled_at: new Date(now.getTime() + 172800000), status: 'APPROVED', created_by: 'employee', created_at: now, updated_at: now },
      { id: 3, client_id: 4, employee_id: 3, business_id: 1, title: 'Follow-up', description: 'Post-service follow-up', scheduled_at: new Date(now.getTime() + 259200000), status: 'PENDING', created_by: 'client', created_at: now, updated_at: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('appointments', null, {});
    await queryInterface.bulkDelete('client_details', null, {});
    await queryInterface.bulkDelete('employee_details', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('businesses', null, {});
  },
};
