'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Users", // name of Source model
      "favourites", // name of the key we're adding
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Users", // name of Source model
      "favourites", // key we want to remove
      {
        type: Sequelize.STRING,
      }
    );
  }
};
