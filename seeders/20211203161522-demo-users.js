'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.bulkInsert(
    "Users",
    [
      {
        username: "margarita",
        password:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJpYXQiOjE2MzgzNTc2NDJ9.0_h8w_FScmUDtYHAzOK82sH9iLuio9Vfpdiyhi68RPY",
        email: "margarita@margarita.margarita",
        favourites: "1,2,3,4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "pepe",
        password:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJpYXQiOjE2MzgzNTc2NDJ9.0_h8w_FScmUDtYHAzOK82sH9iLuio9Vfpdiyhi68RPY",
        email: "margarita@margarita.margarita",
        favourites: "1,2,3,4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "fulano",
        password:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJpYXQiOjE2MzgzNTc2NDJ9.0_h8w_FScmUDtYHAzOK82sH9iLuio9Vfpdiyhi68RPY",
        email: "margarita@margarita.margarita",
        favourites: "1,2,3,4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "mengano",
        password:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4LCJpYXQiOjE2MzgzNTc2NDJ9.0_h8w_FScmUDtYHAzOK82sH9iLuio9Vfpdiyhi68RPY",
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
