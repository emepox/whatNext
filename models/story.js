'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Story extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Story.hasMany(models.Node);
      Story.belongsTo(models.User);//{ foreignKey: 'userId' }
    }
  };
  Story.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    reproductions: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    media: DataTypes.STRING,
    isPrivate: DataTypes.BOOLEAN,
    isFinished: DataTypes.BOOLEAN,
    first: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Story',
  });
  return Story;
};