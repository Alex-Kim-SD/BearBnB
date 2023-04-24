'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('review_images', [
      {
        review_id: 1,
        url: 'https://example.com/review-image1.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        review_id: 2,
        url: 'https://example.com/review-image2.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('review_images', null, {});
  },
};
