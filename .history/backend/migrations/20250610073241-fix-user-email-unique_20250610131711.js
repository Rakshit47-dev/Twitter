'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the existing constraint (if any)
    await queryInterface.removeConstraint('users', 'users_user_email_key').catch(() => {});
    
    // Change column type if needed
    await queryInterface.changeColumn('users', 'user_email', {
      type: Sequelize.STRING(100),
      allowNull: false,
      comment: 'Unique email address used for user login (no spaces allowed)',
    });

    // Add a new UNIQUE constraint separately
    await queryInterface.addConstraint('users', {
      fields: ['user_email'],
      type: 'unique',
      name: 'unique_user_email'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback logic
    await queryInterface.removeConstraint('users', 'unique_user_email');
    await queryInterface.changeColumn('users', 'user_email', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
