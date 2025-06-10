const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['userId', 'postId'] // Prevent duplicate likes
      }
    ]
  });

  Like.associate = function(models) {
    Like.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Like.belongsTo(models.Post, { foreignKey: 'postId', onDelete: 'CASCADE' });
  };

  return Like;
};
