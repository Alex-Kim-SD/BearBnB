'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Main St',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.052235,
        lng: -118.243683,
        name: 'Downtown Parking',
        description: 'Secure and convenient parking spot in downtown LA.',
        price: 10.0,
        createdAt: new Date(),
        updatedAt: new Date(),
        previewImage: 1,
        avgRating: 4.5,
      },
      {
        ownerId: 2,
        address: '789 Market St',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Market Street Parking',
        description: 'Affordable parking spot near the shopping district.',
        price: 15.0,
        createdAt: new Date(),
        updatedAt: new Date(),
        previewImage: 3,
        avgRating: 4.0,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Spots', null, {});
  },
};
