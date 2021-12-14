'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert(
       "Nodes",
       [
         {
           situation:
             "Jabali is walking down the street. A neon sign catches their attention",
           StoryId: 1,
           x: 0,
           y: 0,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali enters a bar.",
           StoryId: 1,
           x: 0,
           y: 0,
           createdAt: new Date(),
           updatedAt: new Date(),
         },

         {
           situation: "Jabali enters a restaurant.",
           StoryId: 1,
           x: 0,
           y: 0,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali enters a vinacoteca.",
           StoryId: 1,
           x: 0,
           y: 0,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali gets drunk.",
           StoryId: 1,
           x: 0,
           y: 0,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali destroys the bar.",
           StoryId: 1,
           x: 0,
           y: 0,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali falls in love.",
           StoryId: 1,
           x: 0,
           y: 0,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali destroys the restaurant.",
           StoryId: 1,
           x: 0,
           y: 0,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali gets drunk.",
           StoryId: 1,
           x: 0,
           y: 0,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali destroys the vinacoteca.",
           StoryId: 1,
           x: 0,
           y: 0,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
       ],
       {}
     );
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('Nodes', null, {});

  }
};
