var models = require("../../models")

async function userNotTaken( req, res, next ) {
  try {
      const { username } = req.body;
      console.log(username)
  
      const user = await models.User.findOne({ where: {username}})
  
      if (user) {
        return res.status(400).send({ message: "Username already taken, please use another one or log in!" });
      }
      next();
    } catch (err) {
      res.status(500).send(err);
    }
  }
  
  module.exports = userNotTaken;