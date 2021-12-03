'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        username: "margarita",
        password: "1234",
        email: "margarita@margarita.margarita",
        favourites: "1,2,3,4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "pepe",
        password: "1234",
        email: "margarita@margarita.margarita",
        favourites: "1,2,3,4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "fulano",
        password: "1234",
        email: "margarita@margarita.margarita",
        favourites: "1,2,3,4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "mengano",
        password: "1234",
        email: "margarita@margarita.margarita",
        favourites: "1,2,3,4",
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
