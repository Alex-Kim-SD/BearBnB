'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    static associate(models) {
      ReviewImage.belongsTo(models.Review, {
        foreignKey: 'reviewId',
        as: 'review'
      });
    }
  }
  ReviewImage.init(
    {
      reviewId: DataTypes.INTEGER,
      url: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'ReviewImage',
      tableName: 'review_images',
      underscored: true
    }
  );
  return ReviewImage;
};
