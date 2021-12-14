'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Node extends Model {

    static associate(models) {
      // define association here
      Node.belongsTo(models.Story);
      Node.belongsToMany(models.Node, { as:"Next", through: models.Edge, foreignKey: "next" });
      Node.belongsToMany(models.Node, { as:"Start", through: models.Edge, foreignKey: "start" });
    }
  };
  Node.init({
    situation: DataTypes.TEXT,
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Node',
  });
  return Node;
};