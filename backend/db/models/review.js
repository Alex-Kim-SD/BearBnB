'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE'
      });
      Review.belongsTo(models.Spot, {
        foreignKey: 'spot_id',
        as: 'spot',
        onDelete: 'CASCADE'
      });
      Review.hasMany(models.ReviewImage, {
        foreignKey: 'review_id',
        as: 'reviewImages',
        onDelete: 'CASCADE'
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
      stars: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Review',
      tableName: 'reviews',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  return Review;
};
