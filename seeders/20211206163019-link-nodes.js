'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
await queryInterface.sequelize.query("UPDATE Stories SET first = 1 WHERE id = 1")
await queryInterface.sequelize.query("UPDATE Stories SET first = 1 WHERE id = 2")
await queryInterface.sequelize.query("UPDATE Stories SET first = 1 WHERE id = 3")
await queryInterface.sequelize.query("UPDATE Stories SET first = 1 WHERE id = 4")
await queryInterface.sequelize.query("UPDATE Stories SET first = 11 WHERE id = 5")
  },

  down: async (queryInterface, Sequelize) => {
     
     
  }
};
