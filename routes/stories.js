var express = require("express");
var router = express.Router();
var models = require("../models");

// gets story information (for homepage, for example)
router.get("/", async function (req, res) {
    try {
      const stories = await models.Story.findAll(
        {
            attributes: ['id', 'name','description','category','reproductions', 'rating', 'media'],
            where: { isFinished: 0 },
            include: {model:models.User, attributes:['username']} 
        }
      );
  
      res.send(stories);
      
    } catch (error) {
      res.status(500).send(error);
    }
});

//gets story with a specific id
router.get("/:id", async function (req, res) {
    try {
        const { id } = req.params
        const stories = await models.Story.findOne(
            {
                where: { id },
                include: {model:models.User, attributes:['username']} 
            }
          );
      
          res.send(stories);
      
    } catch (error) {
      res.status(500).send(error);
    }
});

// gets all nodes from a story
router.get("/:id/nodes", async function (req, res) {
  try {
      const { id } = req.params;
      const nodes = await models.Node.findAll(
      {
          attributes: ['id', 'situation'],
          where: { StoryId: id },
      }
    );

    res.send(nodes);
    
  } catch (error) {
    res.status(500).send(error);
  }
});

// adds new story, returns story.id (TODO:configure first so it gets the id of the first node of the story)
router.post("/", async function (req, res) {
    try {
       const {name, description, UserId, media, category, isPrivate, isFinished, first} = req.body;
       const story = await models.Story.create({ name, description, UserId, media, category, isPrivate, isFinished, first })

       res.send({id:story.dataValues.id, name:story.dataValues.name,})
       

    } catch (error) {
      res.status(500).send(error);
    }

});

//deletes story by id
router.delete("/:id", async function (req, res) {
    try{
        const { id } = req.params
        const stories = await models.Story.destroy(
            {
                where: { id }
            }
        );
    
    res.send("Story successfully deleted!")
    
    } catch (error) {
    res.status(500).send(error);
    }
});



module.exports = router;