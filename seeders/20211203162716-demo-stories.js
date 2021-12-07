'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert(
       "Stories",
       [
         {
           name: "Jabalí",
           description: "This is the story of a true survivor: Jabalí.",
           reproductions: 0,
           media: "../client/src/img/placeholder.png",
           category: "Drama",
           isPrivate: 0,
           isFinished: 0,
           userId: 1,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           name: "Jabalí 2: Jabalí strikes back",
           description: "This is the story of a true survivor: Jabalí.",
           reproductions: 0,
           media: "../client/src/img/placeholder.png",
           category: "Drama",
           isPrivate: 0,
           isFinished: 0,
           userId: 1,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           name: "Jabalí 3: Jabalí unchained",
           description: "This is the story of a true survivor: Jabalí.",
           reproductions: 0,
           media: "../client/src/img/placeholder.png",
           category: "Drama",
           isPrivate: 0,
           isFinished: 0,
           userId: 1,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           name: "Jabalí 4: Jabalí returns",
           description: "This is the story of a true survivor: Jabalí.",
           reproductions: 0,
           media: "../client/src/img/placeholder.png",
           category: "Drama",
           isPrivate: 0,
           isFinished: 0,
           userId: 1,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
       ],
       {}
     );
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Stories', null, {});
  }
};
