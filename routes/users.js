var express = require("express");
var router = express.Router();
require("dotenv").config();
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const userShouldBeLoggedIn = require("./middleware/userShouldBeLoggedIn")
const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;


router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {

    const hash = await bcrypt.hash(password, saltRounds);

    await models.User.create({ username, password: hash });

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
      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/dashboard", userShouldBeLoggedIn, (req, res) => {
  const {user_id} = req
  try {
    const user = await models.User.findOne({ where: { id:user_id } })
    res.send(user)
  } catch(error){
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
