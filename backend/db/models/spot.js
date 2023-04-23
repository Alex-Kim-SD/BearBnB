'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'owner'
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        as: 'spotImages'
      });
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        as: 'reviews'
      });
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        as: 'bookings'
      });
    }
  }
  Spot.init(
    {
      ownerId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      previewImage: DataTypes.INTEGER,
      avgRating: DataTypes.FLOAT
    },
    {
      sequelize,
      modelName: 'Spot',
      tableName: 'spots',
      underscored: true
    }
  );
  return Spot;
};
