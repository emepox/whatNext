'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Stories", // name of Source model
      "category", // name of the key we're adding
      {
        type: Sequelize.STRING,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Stories", // name of Source model
      "category" // key we want to remove
    );
  }
};
