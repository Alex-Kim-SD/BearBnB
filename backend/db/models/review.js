'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        as: 'spot'
      });
      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId',
        as: 'reviewImages'
      });
    }
  }
  Review.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: DataTypes.INTEGER,
      spotId: DataTypes.INTEGER,
      review: DataTypes.TEXT,
      stars: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Review',
      tableName: 'reviews',
      underscored: true
    }
  );
  return Review;
};
