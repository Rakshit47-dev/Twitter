const { DataTypes } = require('sequelize');

/**
 * Defines the 'Comment' model representing user comments on posts.
 * Matches PostgreSQL 'comment' table schema with comments and constraints.
 */
module.exports = (sequelize) => {
  const Comment = sequelize.define('Comment', {
    comment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Unique identifier for each comment (auto-incremented)'
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'References the post to which this comment belongs'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'References the user who made the comment'
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [2, 200],
          msg: 'Comment must be between 2 and 200 characters'
        }
      },
      comment: 'Text content of the comment (between 2 and 200 characters)'
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Timestamp when the comment was created'
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Timestamp when the comment was last updated'
    },
    disabled: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Flag indicating if the comment is disabled by moderation'
    }
  }, {
    tableName: 'comments',
    timestamps: false,
    comment: 'Stores user comments made on posts'
  });

  return Comment;
};
