'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE'
      });
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spot_id',
        as: 'spot',
        onDelete: 'CASCADE'
      });
    }
  }
  Booking.init(
    {
      user_id: DataTypes.INTEGER,
      spot_id: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'Booking',
      tableName: 'bookings'
    }
  );
  return Booking;
};
