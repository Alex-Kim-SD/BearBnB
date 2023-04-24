'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Spot, {
        foreignKey: 'owner_id',
        as: 'spots',
        field: 'owner_id' // Add this line
      });
      User.hasMany(models.Review, {
        foreignKey: 'user_id',
        as: 'reviews'
      });
      User.hasMany(models.Booking, {
        foreignKey: 'user_id',
        as: 'bookings'
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      underscored: true, // Add this line
      timestamps: true,  // Add this line
      createdAt: 'created_at', // Add this line
      updatedAt: 'updated_at'  // Add this line
    }
  );
  return User;
};
