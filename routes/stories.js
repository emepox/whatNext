var express = require("express");
var router = express.Router();
var models = require("../models");

const userShouldBeLoggedIn = require("./middleware/userShouldBeLoggedIn");

// gets ALL STORIES information // Story.js component
router.get("/", async function (req, res) {
  try {
    const stories = await models.Story.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "category",
        "reproductions",
        "media",
        "first",
      ],
      where: { isFinished: 1 },
      include: [
        { model: models.User, attributes: ["username", "id"] }, 
        { model: models.User, as: "Favouritee", attributes: ["username", "id"]}
      ]
    });
    res.send(stories);
  } catch (error) {
    res.status(500).send(error);
  }
});

// gets A STORY with a specific ID // READ A STORY
// Doesn't need to be guarded YET
// To guard when functionality PUBLIC/PRIVATE is enabled.
router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const stories = await models.Story.findOne({
      where: { id },
      include: [{ model: models.User, attributes: ["username", "id"] },
      { model: models.User, as: "Favouritee", attributes: ["id", "username"]},]
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
    const story = await models.Story.findOne({where: { id }})
    const nodes = await models.Node.findAll({
      where: { StoryId: id },
      include: { model: models.Node, as: "Start", attributes: ["id"] },
    });
    const first = nodes.find(e => e.id === story.first)

    const result = nodes.map((node) => {
      return node.id === first.id
      ?{
        ...node.dataValues,
        first:true,
        Start: node.dataValues.Start.map((e) => e.Edge),
      }
      :{
        ...node.dataValues,
        Start: node.dataValues.Start.map((e) => e.Edge),
      }
    });
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POSTS new story, returns story.id
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
} );

// POSTING REVIEWS

// With UPSERT
router.put("/:storyId/rating", userShouldBeLoggedIn, async function (req, res) {
  const { id } = req.user;
  const { score, storyId } = req.body;
  console.log(id, storyId, score);

  try {
    const result = await models.Rating.findOne({
      where: {
        UserId: id,
        StoryId: storyId,
      },
    });
    await models.Rating.upsert({
      id: result?.id,
      score: score,
      StoryId: storyId,
      UserId: id,
    });

    res.send("Rating added");
  } catch (error) {
    res.status(500).send(error);
  }
});

// Without UPSERT
// router.put("/:storyId/review", userShouldBeLoggedIn, async function (req, res) {
//   try {
//     const { storyId } = req.params;
//     const { id } = req.user;
//     const { score } = req.body;
//     const review = await models.Rating.update(
//       { StoryId: storyId, score, UserId: id },
//       { where: { StoryId: storyId, UserId: id } }
//     );
//     if (!review[0])
//       await models.Rating.create({ StoryId: storyId, score, UserId: id });
//     res.send("rating added");
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

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

// DELETES STORY BY ID
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
} );

// GETS GLOBAL RATING OF A STORY
router.get( "/:id/rating", async function ( req, res ) {
  try {
    const { id } = req.params;
    const data = await models.Rating.findAll({
      attributes: ["score"],
      where: { StoryId: id },
    } );

    let average = 0;

    if ( data.length ) {
      
      const sum = Object.keys( data ).reduce(     function ( previous, key ) {
        return previous + data[ key ].score;
      }, 0 );      
      average = ( sum / data.length ).toFixed( 1 );
    }
    
    const result = {
      average: average,
      amount: data.length
    }
    res.send(result);
  
  } catch ( err ) {
    res.status(500).send(err);
  }


})

module.exports = router;
