"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Story extends Model {

    static associate(models) {
      // define association here
      Story.hasMany(models.Node);
      Story.hasMany(models.Rating);
      Story.belongsTo(models.User);
      Story.belongsToMany(models.User, {
        as: "Favouritee",
        through: "Favourites",
      });
    }
  }
  Story.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      reproductions: DataTypes.INTEGER,
      media: DataTypes.STRING,
      category: DataTypes.STRING,
      isPrivate: DataTypes.BOOLEAN,
      isFinished: DataTypes.BOOLEAN,
      first: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Story",
    }
  );
  return Story;
};
