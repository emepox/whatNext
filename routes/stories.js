var express = require("express");
var router = express.Router();
var models = require("../models");

// gets story information (for homepage, for example)
router.get("/", async function (req, res) {
    try {
      const stories = await models.Story.findAll(
        {
            attributes: ['id', 'name','description','reproductions', 'rating', 'media'],
            where: { isFinished: 0 },
            include: {model:models.User, attributes:['username']} 
        }
      );
  
      res.send(stories);
      
    } catch (error) {
      res.status(500).send(error);
    }
});

router.post("/", async function (req, res) {
    try {
       const {name, description, userId, media, isPrivate, isFinished, first} = req.body;
       const story = await models.Story.create({ name, description, userId, media, isPrivate, isFinished, first })

       res.send({id:story.dataValues.id})
       

    } catch (error) {
      res.status(500).send(error);
    }

});

module.exports = router;