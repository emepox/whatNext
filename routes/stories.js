var express = require("express");
var router = express.Router();
var models = require("../models");

const userShouldBeLoggedIn = require("./middleware/userShouldBeLoggedIn");

// gets ALL STORIES information // READ STORIES PAGE

router.get("/", async function (req, res) {
  try {
    const stories = await models.Story.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "category",
        "reproductions",
        "rating",
        "media",
        "first"
      ],
      where: { isFinished: 0 },
      include: { model: models.User, attributes: ["username", "id"] },
    });

    res.send(stories);
  } catch (error) {
    res.status(500).send(error);
  }
});

//gets A STORY with a specific ID // READ A STORY
// Doesn't need to be guarded YET
// To guard when functionality PUBLIC/PRIVATE is enabled.
router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const stories = await models.Story.findOne({
      where: { id },
      include: { model: models.User, attributes: ["username"] },
    });

    res.send(stories);
  } catch (error) {
    res.status(500).send(error);
  }
});

// gets ALL NODES from A STORY
// To read a story. See above comment.

router.get("/:id/nodes", async function (req, res) {
  try {
    const { id } = req.params;
    const nodes = await models.Node.findAll({
      attributes: ["id", "situation"],
      where: { StoryId: id },
    });

    res.send(nodes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POSTS new story, returns story.id
// TODO: configure first so it gets the id of the first node of the story

router.post("/", userShouldBeLoggedIn, async function (req, res) {
  const { id } = req.user;
  try {
    const { name, description, media, category, isPrivate, isFinished } =
      req.body;
    const story = await models.Story.create({
      name,
      description,
      UserId: id,
      media,
      category,
      isPrivate,
      isFinished,
    });
    res.send(story.dataValues);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUTS the FIRST NODE ID in STORIES table
router.put("/:id/first", async function (req, res) {
  try {
    const { id } = req.params;
    const { firstId } = req.body;
    await models.Story.update(
      { first: firstId },
      {
        where: { id },
      }
    );

    res.send("Story successfully edited!");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:storyId/review", userShouldBeLoggedIn, async function (req, res) {
  try {
    const { storyId } = req.params;
    const { id } = req.user;
    const { score } = req.body;
    const review = await models.Rating.update(
      { StoryId: storyId, score, UserId: id },
      { where: { StoryId: storyId, UserId: id } }
    );
    if (!review[0]) await models.Rating.create(
      { StoryId: storyId, score, UserId: id }
    );
    res.send("rating added")
  } catch (error) {
    res.status(500).send(error);
  }
});

// Switches isFinished to true in STORIES table
router.put("/:id/finish", async function (req, res) {
  try {
    const { id } = req.params;
    await models.Story.update(
      { isFinished: 1 },
      {
        where: { id },
      }
    );

    res.send("Story successfully edited!");
  } catch (error) {
    res.status(500).send(error);
  }
});

//deletes story by id
router.delete("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const stories = await models.Story.destroy({
      where: { id },
    });

    res.send("Story successfully deleted!");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
