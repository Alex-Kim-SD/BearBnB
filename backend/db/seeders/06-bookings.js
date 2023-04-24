'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
      {
        user_id: 1,
        spot_id: 1,
        start_date: new Date('2023-05-01'),
        end_date: new Date('2023-05-03'),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        spot_id: 2,
        start_date: new Date('2023-05-10'),
        end_date: new Date('2023-05-12'),
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bookings', null, {});
  },
};
