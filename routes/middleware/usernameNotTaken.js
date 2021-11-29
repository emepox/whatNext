const { Model } = require("sequelize/dist");
var models = require("../models")

async function emailNotTaken(req, res, next) {
    try {
      const { username } = req.body;
  
      const results = await models.User.findOne({ where: {username}})
  
      if (results.data.length) {
        return res.status(400).send({ message: "Username already taken, please use another one or log in!" });
      }
      next();
    } catch (err) {
      res.status(500).send(err);
    }
  }
  
  module.exports = emailNotTaken;