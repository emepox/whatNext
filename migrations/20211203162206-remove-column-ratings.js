'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Stories", // name of Source model
      "rating", // name of the key we're adding
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Stories", // name of Source model
      "rating", // key we want to remove
      {
        type: Sequelize.STRING,
      }
    );
  }
};
