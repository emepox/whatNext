'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert(
       "Nodes",
       [
         {
           situation: "Jabali escapes the forest.",
           StoryId: null,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali enters a bar.",
           StoryId: null,
           createdAt: new Date(),
           updatedAt: new Date(),
         },

         {
           situation: "Jabali enters a restaurant.",
           StoryId: null,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali enters a vinacoteca.",
           StoryId: null,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali gets drunk.",
           StoryId: null,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali destroys the bar.",
           StoryId: null,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali falls in love.",
           StoryId: null,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali destroys the restaurant.",
           StoryId: null,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali gets drunk.",
           StoryId: null,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali destroys the vinacoteca.",
           StoryId: null,
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
