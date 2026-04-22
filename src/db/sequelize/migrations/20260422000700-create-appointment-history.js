'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointment_history', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      appointment_id: { type: Sequelize.INTEGER, allowNull: false },
      action: { type: Sequelize.STRING, allowNull: false },
      performed_by: { type: Sequelize.INTEGER, allowNull: false },
      notes: { type: Sequelize.TEXT },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });
  },
  async down(queryInterface) { await queryInterface.dropTable('appointment_history'); },
};
