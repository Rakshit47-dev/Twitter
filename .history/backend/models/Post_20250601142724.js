const { DataTypes } = require('sequelize');

/**
 * Defines the 'Post' model representing tweets/posts by users.
 * Matches PostgreSQL 'post' table schema with comments and constraints.
 */
module.exports = (sequelize) => {
  const Post = sequelize.define('Post', {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Unique identifier for each post (auto-incremented)'
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'References the user who created the post'
      // You can also set up associations in your model index file
    },
    post_content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [5, 250],
          msg: 'Post content must be between 5 and 250 characters'
        }
      },
      comment: 'Main content of the post (between 5 and 250 characters)'
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Timestamp when the post was created'
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      comment: 'Timestamp when the post was last updated'
    },
    disabled: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: 'Flag indicating if the Post is disabled by moderation'
    }
  }, {
    tableName: 'posts',
    timestamps: false,
    comment: 'Stores posts (tweets) created by users'
  });

  return Post;
};
