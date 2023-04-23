'use strict';

const bcrypt = require('bcrypt');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        password_hash: await bcrypt.hash('john123', 10)
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        username: 'janedoe',
        email: 'jane.doe@example.com',
        password_hash: await bcrypt.hash('jane123', 10)
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
