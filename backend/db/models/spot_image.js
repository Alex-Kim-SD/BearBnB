'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    static associate(models) {
      SpotImage.belongsTo(models.Spot, {
        foreignKey: 'spot_id',
        as: 'spot'
      });
    }
  }
  SpotImage.init(
    {
      spot_id: DataTypes.INTEGER,
      url: DataTypes.STRING,
      preview: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'SpotImage',
      tableName: 'spot_images'
    }
  );
  return SpotImage;
};
