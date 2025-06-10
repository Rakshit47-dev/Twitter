const db = require('../config/database');
co
const User = require('./User')(db);
const Post = require('./Post')(db);
const Comment = require('./comment')(db);
const Like = require('./Like')(sequelize, Sequelize.DataTypes);

// User ↔ Post
User.hasMany(Post, { foreignKey: 'user_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

// Post ↔ Comment
Post.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

// User ↔ Comment
User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

// ✅ User ↔ Like
User.hasMany(Like, { foreignKey: 'userId' });
Like.belongsTo(User, { foreignKey: 'userId' });

// ✅ Post ↔ Like
Post.hasMany(Like, { foreignKey: 'postId' });
Like.belongsTo(Post, { foreignKey: 'postId' });

module.exports = {
  db,
  User,
  Post,
  Comment,
  Like 
};
