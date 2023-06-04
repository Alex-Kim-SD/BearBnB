'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Spot, {
        foreignKey: 'owner_id',
        as: 'spots',
        field: 'owner_id',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Review, {
        foreignKey: 'user_id',
        as: 'reviews',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Booking, {
        foreignKey: 'user_id',
        as: 'bookings',
        onDelete: 'CASCADE'
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
      underscored: true,
      timestamps: true, 
      createdAt: 'created_at',
      updatedAt: 'updated_at' 
    }
  );
  return User;
};
