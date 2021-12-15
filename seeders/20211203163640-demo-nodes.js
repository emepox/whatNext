'use strict';
const models = require("../models")

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
         {
          
          situation:
             "Once upon a time there was an old mother pig who had three little pigs and not enough food to feed them. So when they were old enough, she sent them out into the world to seek their fortunes.",
           StoryId: 5,
           x: -503,
           y: -80,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
          
          situation: "They want to buy the materials for their new homes.",
           StoryId: 5,
           x: 259,
           y: -674,
           createdAt: new Date(),
           updatedAt: new Date(),
         },

         {
          
          situation:
             "They wander through the forest for 3 days and 3 nights, and in the end they find the Big Bad Wolf.",
           StoryId: 5,
           x: 407,
           y: -205,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
         
          situation:
             "They started building their houses. The first little pig was very lazy. He didn't want to work at all and he built his house out of straw. The second little pig was somewhat lazy too and he built his house out of wood. Then, they sang and danced and played together the rest of the day. The third little pig worked hard all day and built his house with bricks. It looked like it could withstand the strongest winds.",
           StoryId: 5,
           x: 251,
           y: 469,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
          
          situation:
             "They had to find the construction material in the wild. In the end, they collected a nice pile of straw and woo.",
           StoryId: 5,
           x: 1744,
           y: -754,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
         
          situation:
             "They just get lost in the exhibition and end up being sold as plushes: PÖRKÖ 3,99€.",
           StoryId: 5,
           x: 1723,
           y: -387,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
          
          situation:
             "The wolf dies from a heart attack. The pigs live forever and ever without predators.",
           StoryId: 5,
           x: 1723,
           y: -190,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
          
          situation: "The piglets die eaten by the wolf.",
           StoryId: 5,
           x: 1398,
           y: 75,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
          
          situation:
             "The pigs live forever and ever a good life without any predators.",
           StoryId: 5,
           x: 1209,
           y: 253,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
          
          situation:
             "The wolf finds them. He's hungry. He starts HUFFING AND PUFFING.",
           StoryId: 5,
           x: 1271,
           y: 812,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
         
          situation:
             "The lazy pigs regret being so lazy, but they manage to escape to their brother's home, made of bricks.",
           StoryId: 5,
           x: 1821,
           y: 401,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
         
          situation:
             "In an unexpected turn of events, the pigs attack the wolf and eat him.",
           StoryId: 5,
           x: 2107,
           y: 101,
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
