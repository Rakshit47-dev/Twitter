const { DataTypes } = require('sequelize');

/**
 * Defines the 'User' model representing registered users.
 * Includes validations, metadata, and moderation flag.
 */
module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Unique identifier for each user (auto-incremented)'
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [2, 50],
          msg: 'Name must be between 2 and 50 characters'
        }
      },
      comment: 'Name of the user (2–50 characters)'
    },
    user_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notContains: {
          args: [' '],
          msg: 'Email cannot contain spaces'
        }
      },
      comment: 'Unique email address used for user login (no spaces allowed)'
    },
    user_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: 'User\'s password stored in ha'
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Timestamp when the user account was created'
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Timestamp when the user account was last updated'
    },
    disabled: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Flag indicating if the user account is disabled (banned or deactivated)'
    }
  }, {
    tableName: 'users',
    timestamps: false,
    comment: 'Stores registered users who can create posts and comments'
  });

  return User;
};
