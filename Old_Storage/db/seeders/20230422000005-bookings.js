'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('bookings', [
      {
        id: 1,
        userId: 2,
        spotId: 1,
        startDate: new Date('2023-05-01'),
        endDate: new Date('2023-05-07'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bookings', null, {});
  },
};
