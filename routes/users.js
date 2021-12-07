var express = require("express");
var router = express.Router();
require("dotenv").config();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var models = require("../models");
const userShouldBeLoggedIn = require("./middleware/userShouldBeLoggedIn");
const usernameNotTaken = require("./middleware/usernameNotTaken");
const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;

router.post("/register", usernameNotTaken, async (req, res) => {
  const { username, password, email } = req.body;
  console.log(username, email, password);
  console.log(supersecret);
  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await models.User.create({ username, password: hash, email });

    res.send({ message: "Register successful" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await models.User.findOne({ where: { username } });

    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      var token = jwt.sign({ user_id }, supersecret);

      console.log("token", token);
      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// gets all the info of the logged in user
router.get("/dashboard", userShouldBeLoggedIn, async (req, res) => {
  const { id } = req.user;
  try {
    const user = await models.User.findOne({ where: { id:id } })
    res.send(user)
  } catch(error){

    res.status(400).send({ message: err.message });
  }
});

// gets all stories from one user
router.get("/profile", userShouldBeLoggedIn, async function (req, res) {
  try {
    const { id } = req.user;
      const stories = await models.Story.findAll(
          {
              where: { UserId: id },
              include: {model:models.User, attributes:['username']} 
          }
        );

    res.send(stories);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
