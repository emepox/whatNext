'use strict';
const bcrypt = require( 'bcrypt' );
const saltRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {


  await queryInterface.bulkInsert(
    "Users",
    [
      {
       
        username: "margarita",
        password: await bcrypt.hash("1234", saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
       
        username: "pepe",
        password: await bcrypt.hash("1234", saltRounds),
        email: "pepe@pepe.pepe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
       
        username: "fulano",
        password: await bcrypt.hash("1234", saltRounds),
        email: "fulano@fulano.fulano",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
      
        username: "mengano",
        password: await bcrypt.hash("1234", saltRounds),
        email: "mengano@mengano.mengano",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null, {});
  }
};
