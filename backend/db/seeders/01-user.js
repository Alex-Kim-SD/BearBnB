'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        username: 'johndoeuser',
        password_hash: 'hashed_password1',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@example.com',
        username: 'janedoeuser',
        password_hash: 'hashed_password2',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
