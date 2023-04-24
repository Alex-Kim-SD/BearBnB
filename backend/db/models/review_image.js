'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    static associate(models) {
      ReviewImage.belongsTo(models.Review, {
        foreignKey: 'review_id',
        as: 'review',
        onDelete: 'CASCADE'
      });
    }
  }
  ReviewImage.init(
    {
      review_id: DataTypes.INTEGER,
      url: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'ReviewImage',
      tableName: 'review_images'
    }
  );
  return ReviewImage;
};
