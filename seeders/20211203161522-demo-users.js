'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        username: "margarita",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "pepe",
        password: "1234",
        email: "pepe@pepe.pepe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "fulano",
        password: "1234",
        email: "fulano@fulano.fulano",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "mengano",
        password: "1234",
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
