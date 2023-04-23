'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('spots', [
      {
        id: 1,
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
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('spots', null, {});
  },
};
