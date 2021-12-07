'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
    await queryInterface.bulkInsert(
      "Edges",
      [
        {
          start: 2,
          next: 5,
          option: "You invite Jabalí to a beer.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 2,
          next: 6,
          option: "You scream at Jabalí.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 3,
          next: 7,
          option: "You invite Jabalí to dinner.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 3,
          next: 8,
          option: "You yell at Jabalí.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 4,
          next: 9,
          option: "You invite Jabalí to a bottle of wine.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 4,
          next: 10,
          option: "You panic.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Edges', null, {});
     
  }
};
