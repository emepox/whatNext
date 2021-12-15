'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Edge extends Model {

    static associate(models) {
      // define association here
    }
  };
  Edge.init({
    option: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Edge',
  });
  return Edge;
};