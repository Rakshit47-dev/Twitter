module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'user_post_unique'
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'user_post_unique'
    }
  });

  Like.associate = function (models) {
    Like.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Like.belongsTo(models.Post, { foreignKey: 'postId', onDelete: 'CASCADE' });
  };

  return Like;
};
