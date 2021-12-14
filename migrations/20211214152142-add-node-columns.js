'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [queryInterface.addColumn(
      "Nodes", // name of Source model
      "x", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    ),
    queryInterface.addColumn(
      "Nodes", // name of Source model
      "y", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    ),
  ]
  },

  down: async (queryInterface, Sequelize) => {
    return [queryInterface.removeColumn(
      "Nodes", // name of Source model
      "x" // key we want to remove
    ),
    queryInterface.removeColumn(
      "Nodes", 
      "y" 
    )
  ]
  }
};