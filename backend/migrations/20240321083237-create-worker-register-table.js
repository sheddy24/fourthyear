'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WorkerRegisters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('present', 'absent'),
        allowNull: false
      },
      approvalStatus: {
        type: Sequelize.ENUM('pending', 'approved', 'disapproved'),
        allowNull: true,
        defaultValue: 'pending'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Projects', // Make sure to adjust the table name if it's different
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add unique constraint on (date, userId) combination
    await queryInterface.addConstraint('WorkerRegisters', {
      type: 'unique',
      fields: ['date', 'userId'],
      name: 'unique_date_userId_constraint'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('WorkerRegisters');
  }
};
