'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        as: 'spot'
      });
    }
  }
  Booking.init(
    {
      userId: DataTypes.INTEGER,
      spotId: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Booking',
      tableName: 'bookings',
      underscored: true
    }
  );
  return Booking;
};
