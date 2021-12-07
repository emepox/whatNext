'use strict';

const bcrypt = require( "bcrypt" );
const jwt = require( "jsonwebtoken" );
const { Model } = require( 'sequelize' );
const saltRounds = 10;

const hashFunction = (user, options) => {
  const hash = bcrypt.hash(password, saltRounds);
  user.password = hash;
};



module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Story);
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      favourites: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(hashFunction);

  return User;
};