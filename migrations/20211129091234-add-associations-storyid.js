'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Nodes", // name of Source model
      "StoryId", // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: "Stories", // name of Target model
          key: "id", // key in Target model that we're referencing
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Nodes", // name of Source model
      "StoryId" // key we want to remove
    );
  }
};
