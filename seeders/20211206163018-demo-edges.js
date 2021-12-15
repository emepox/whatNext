'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
    await queryInterface.bulkInsert(
      "Edges",
      [
        {
          start: 1,
          next: 2,
          option: "It's a bar!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 1,
          next: 3,
          option: "The fanciest restaurant in town",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 1,
          next: 4,
          option: "A new vinacoteca!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
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
          start: 11,
          next: 12,
          option: "The three little pigs go to the city.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          start: 11,
          next: 13,
          option: "The three little pigs get lost in the forest.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 11,
          next: 14,
          option: "The three little pigs decide to build their houses.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 12,
          next: 15,
          option:
            "No shop would sell anything to them because they were stinking like pigs because well, they were pigs.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          start: 13,
          next: 17,
          option: "They scream and scream and scream and run in circles.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 12,
          next: 16,
          option: "They go to Ikea.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 13,
          next: 18,
          option: "You send them hopes and prayers.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 14,
          next: 19,
          option:
            "You are nice, so you want the pigs to live a long and a full life.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 14,
          next: 20,
          option: "You are not very nice and you want the wolf to find them.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 15,
          next: 14,
          option:
            "You give them some flutes and bongos so they procrastinate all day.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 20,
          next: 21,
          option: "The houses of straw and wood fall apart.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 20,
          next: 19,
          option:
            "The house doesn't fall and the wolf decides that it's not worthy",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 21,
          next: 22,
          option: "The brick house falls.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          start: 21,
          next: 17,
          option: "The wolf keeps HUFFING AND PUFFING.",
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
