module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Edges", {
      start: {
        type: Sequelize.INTEGER,
        references: {
          model: "Nodes",
          key: "id",
        },
        allowNull: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      next: {
        type: Sequelize.INTEGER,
        references: {
          model: "Nodes",
          key: "id",
        },
        allowNull: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      option: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Edges");
  },
};
