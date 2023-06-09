'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.User, {
        foreignKey: 'owner_id',
        as: 'owner',
        field: 'owner_id',
        onDelete: 'CASCADE'
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spot_id',
        as: 'spotImages',
        onDelete: 'CASCADE'
      });
      Spot.hasMany(models.Review, {
        foreignKey: 'spot_id',
        as: 'reviews',
        onDelete: 'CASCADE'
      });
      Spot.hasMany(models.Booking, {
        foreignKey: 'spot_id',
        as: 'bookings',
        onDelete: 'CASCADE'
      });
    }
  }
  Spot.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      lat: DataTypes.FLOAT,
      lng: DataTypes.FLOAT,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      preview_image: DataTypes.STRING,
      avg_rating: DataTypes.FLOAT
    },
    {
      sequelize,
      modelName: 'Spot',
      tableName: 'spots',
      underscored: true,
      timestamps: true, 
      createdAt: 'created_at',
      updatedAt: 'updated_at' 
    }
  );
  return Spot;
};
