const db = require('../config/database'); // your sequelize instance
const { DataTypes } = require('sequelize'); // import DataTypes separately

const User = require('./User')(db, DataTypes);
const Post = require('./Post')(db, DataTypes);
const Comment = require('./Comment')(db, DataTypes);
const Like = require('./Like')(db, DataTypes);

// User ↔ Post
User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

// Post ↔ Comment
Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

// User ↔ Comment
User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

// User ↔ Like
User.hasMany(Like, { foreignKey: 'user_id',onDelete:'CASCADE' });
Like.belongsTo(User, { foreignKey: 'user_id' });

// Post ↔ Like
Post.hasMany(Like, { foreignKey: 'post_id',as:'likes' });
Like.belongsTo(Post, { foreignKey: 'post_id' });

module.exports = {
  db,
  User,
  Post,
  Comment,
  Like,
};
