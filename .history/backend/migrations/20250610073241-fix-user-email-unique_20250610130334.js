'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Step 1: Change the user_email column type and constraints (without UNIQUE)
    await queryInterface.changeColumn('users', 'user_email', {
      type: Sequelize.STRING(100),
      allowNull: false,
      comment: 'Unique email address used for user login (no spaces allowed)',
    });

    // Step 2: Add unique constraint separately
    await queryInterface.addConstraint('users', {
      fields: ['user_email'],
      type: 'unique',
      name: 'user_email_unique_constraint',
    });
  },

  async down(queryInterface, Sequelize) {
    // Step 1: Remove the unique constraint
    await queryInterface.removeConstraint('users', 'user_email_unique_constraint');

    // Step 2: Revert the column back to original (change as needed)
    await queryInterface.changeColumn('users', 'user_email', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
