const jwt = require( "jsonwebtoken" );
var models = require("../../models");

require("dotenv").config();
const supersecret = process.env.SUPER_SECRET;

function userShouldBeLoggedIn(req, res, next) {
  const token = req.headers[ "authorization" ]?.replace( /^Bearer\s/, "" );
  console.log( token )
  if (!token) {
    res.status(401).send({ message: "please provide a token" });
  } else {
    jwt.verify(token, supersecret, async function (err, decoded) {
      if (err) res.status(401).send({ message: err.message });
      else {
        //everything is awesome
        req.user_id = decoded.user_id;
        const id = req.user_id;
        console.log("usuario:", id)
        const results = await models.User.findOne( { where: { id } } );        
        const { username, favourites, createdAt, updatedAt } = results.dataValues;

        req.user = results;
        console.log("I am in the guard, this is the user:",req.user)
        next();
      }
    });
  }
}

module.exports = userShouldBeLoggedIn;