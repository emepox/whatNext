var express = require("express");
var router = express.Router();
require("dotenv").config();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var models = require("../models")
const userShouldBeLoggedIn = require("./middleware/userShouldBeLoggedIn")
const usernameNotTaken = require("./middleware/usernameNotTaken")
const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;



router.post( "/register", usernameNotTaken, async ( req, res ) => {
  const { username, password, email } = req.body;
  console.log( username, email, password )
  console.log(supersecret);
  try {

    const hash = await bcrypt.hash(password, saltRounds);

    await models.User.create({ username, password: hash, email  });

    res.send({ message: "Register successful" });

  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post( "/login", async ( req, res ) => {
  const { username, password } = req.body;
  try {
    const user = await models.User.findOne( { where: { username } } );

    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare( password, user.password );

      if ( !correctPassword ) throw new Error( "Incorrect password" );
      console.log("Llega hasta aquí", user_id)

      var token = jwt.sign( { user_id }, supersecret );

      console.log("token", token)
      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/dashboard", userShouldBeLoggedIn, async (req, res) => {
  const {user_id} = req
  try {
    const user = await models.User.findOne({ where: { id:user_id } })
    res.send(user)
  } catch(error){
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
