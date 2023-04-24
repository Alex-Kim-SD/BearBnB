'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('spot_images', [
      {
        spot_id: 1,
        url: 'https://example.com/image1.jpg',
        preview: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        spot_id: 1,
        url: 'https://example.com/image2.jpg',
        preview: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        spot_id: 2,
        url: 'https://example.com/image3.jpg',
        preview: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('spot_images', null, {});
  },
};
