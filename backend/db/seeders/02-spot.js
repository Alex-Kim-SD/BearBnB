'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        owner_id: 1,
        address: '123 Main St',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.052235,
        lng: -118.243683,
        name: 'Downtown Parking',
        description: 'Secure and convenient parking spot in downtown LA.',
        price: 10.0,
        created_at: new Date(),
        updated_at: new Date(),
        preview_image: 1,
        avg_rating: 4.5,
      },
      {
        owner_id: 2,
        address: '789 Market St',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Market Street Parking',
        description: 'Affordable parking spot near the shopping district.',
        price: 15.0,
        created_at: new Date(),
        updated_at: new Date(),
        preview_image: 3,
        avg_rating: 4.0,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Spots', null, {});
  },
};