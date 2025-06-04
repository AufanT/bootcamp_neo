'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Developers', [{
        name: 'Game Studio A',
        country: 'USA',
        founded_year: 2000,
        website: 'https://gamestudioa.com',
        email: 'gamestudioA@studio.com',
        password: await bcrypt.hash('password123', 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        name: 'Game Studio B',
        country: 'UK',
        founded_year: 2005,
        website: 'https://gamestudiob.com',
        email: 'gamestudioB@studio.com',
        password: await bcrypt.hash('password1234', 10),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Developers', null, {});
  }
};
