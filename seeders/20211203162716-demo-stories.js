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
           media:
             "https://elcomercio.pe/resizer/KsHKxeRO4pmkG7Unb9mGR6rr1Vc=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/ZHS7NZPLMRFK7OOG7CHS67R4WI.jpeg",
           category: "Drama",
           isPrivate: 0,
           isFinished: 1,
           userId: 1,
           first: 1,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           name: "Jabalí 2: Jabalí strikes back",
           description: "Jabalí is back for vengeance.",
           reproductions: 0,
           media:
             "https://site-782965.mozfiles.com/files/782965/galleries/20698508/large/JABALI5.jpg?",
           category: "Drama",
           isPrivate: 0,
           isFinished: 1,
           userId: 1,
           first: 1,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           name: "Jabalí 3: Jabalí unchained",
           description: "Our hero is back without restraints.",
           reproductions: 0,
           media:
             "https://revistajaraysedal.es/wp-content/uploads/2021/04/edad-maximo-desarrollo-jabali-768x432.jpg",
           category: "Drama",
           isPrivate: 0,
           isFinished: 1,
           userId: 2,
           first: 1,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           name: "Jabalí 4: Jabalí returns",
           description: "Jabalí, but more.",
           reproductions: 0,
           media:
             "https://minuartia.com/wp-content/uploads/2020/10/article-senglar.jpeg",
           category: "Drama",
           isPrivate: 0,
           isFinished: 1,
           userId: 3,
           first: 1,
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
