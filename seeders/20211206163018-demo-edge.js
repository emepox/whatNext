'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
    await queryInterface.bulkInsert(
      "Edges",
      [
        {
          start: null,
          next: null,
          option: "You invite Jabalí to a beer.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: null,
          next: null,
          option: "You scream at Jabalí.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: null,
          next: null,
          option: "You invite Jabalí to dinner.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: null,
          next: null,
          option: "You yell at Jabalí.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: null,
          next: null,
          option: "You invite Jabalí to a bottle of wine.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: null,
          next: null,
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
