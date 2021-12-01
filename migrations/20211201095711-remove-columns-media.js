'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Nodes", // name of Source model
      "media", // name of the key we're adding
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Nodes", // name of Source model
      "media", // key we want to remove
      {
        type: Sequelize.STRING,
      }
    );
  }
};