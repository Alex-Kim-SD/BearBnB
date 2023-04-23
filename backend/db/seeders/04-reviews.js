'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('reviews', [
      {
        id: 1,
        userId: 1,
        spotId: 1,
        review: 'Great spot, very convenient.',
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 2,
        spotId: 2,
        review: 'Nice location, easy access.',
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reviews', null, {});
  },
};
