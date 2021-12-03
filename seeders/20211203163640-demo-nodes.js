'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert(
       "Nodes",
       [
         {
           situation: "Jabali enters a bar.",
           StoryId: 17,
           createdAt: new Date(),
           updatedAt: new Date(),
         },

         {
           situation: "Jabali enters a restaurant.",
           StoryId: 17,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali destroys the bar.",
           StoryId: 17,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali destroys the restaurant.",
           StoryId: 17,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali enters a museum.",
           StoryId: 18,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali enters a gallery.",
           StoryId: 18,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali destroys a museum.",
           StoryId: 18,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali destroys a gallery.",
           StoryId: 18,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali enters a bookshop.",
           StoryId: 19,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali enters a library.",
           StoryId: 19,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali destroys a bookshop.",
           StoryId: 19,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali destroys a library.",
           StoryId: 19,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali enters a shop.",
           StoryId: 20,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali enters a Mercadona.",
           StoryId: 20,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali destroys a shop.",
           StoryId: 20,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           situation: "Jabali destroys a Mercadona.",
           StoryId: 20,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
       ],
       {}
     );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
