'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      client_id: { type: Sequelize.INTEGER, allowNull: false },
      employee_id: { type: Sequelize.INTEGER, allowNull: false },
      business_id: { type: Sequelize.INTEGER, allowNull: false },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      scheduled_at: { type: Sequelize.DATE, allowNull: false },
      status: { type: Sequelize.ENUM('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED'), allowNull: false, defaultValue: 'PENDING' },
      created_by: { type: Sequelize.STRING, allowNull: false },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      deleted_at: { type: Sequelize.DATE },
    });
  },
  async down(queryInterface) { await queryInterface.dropTable('appointments'); },
};
