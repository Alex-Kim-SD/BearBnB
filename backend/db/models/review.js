'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
      Review.belongsTo(models.Spot, {
        foreignKey: 'spot_id',
        as: 'spot'
      });
      Review.hasMany(models.ReviewImage, {
        foreignKey: 'review_id',
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
      user_id: DataTypes.INTEGER,
      spot_id: DataTypes.INTEGER,
      review: DataTypes.TEXT,
      stars: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Review',
      tableName: 'reviews'
    }
  );
  return Review;
};
