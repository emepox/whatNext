'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Node extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Node.belongsTo(models.Story, { foreignKey: 'storyId' });
      Node.belongsToMany(models.Node, { as:"Children", through: "Edges" });
    }
  };
  Node.init({
    situation: DataTypes.TEXT,
    media: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Node',
  });
  return Node;
};