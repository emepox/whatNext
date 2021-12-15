'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
 
    static associate(models) {
      Rating.belongsTo(models.User);
      Rating.belongsTo(models.Story);
    }
  };
  Rating.init({
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};