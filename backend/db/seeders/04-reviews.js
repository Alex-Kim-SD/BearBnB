'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('reviews', [
      {
        id: 1,
        user_id: 1,
        spot_id: 1,
        review: 'Great spot, very convenient.',
        stars: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        user_id: 2,
        spot_id: 2,
        review: 'Nice location, easy access.',
        stars: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('reviews', null, {});
  },
};
