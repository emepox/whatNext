var express = require("express");
var router = express.Router();
var models = require( "../models" );

const userShouldBeLoggedIn = require("./middleware/userShouldBeLoggedIn");


// gets story information (for homepage, for example)
router.get("/", async function (req, res) {
    try {
      const stories = await models.Story.findAll(
        {
            attributes: ['id', 'name','description','reproductions', 'rating', 'media'],
            where: { isFinished: 0 },
            include: {model:models.User, attributes:['username', "id"]} 
        }
      );
  
      res.send(stories);
      
    } catch (error) {
      res.status(500).send(error);
    }
});

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

// adds new story, returns story.id (TODO:configure first so it gets the id of the first node of the story)
router.post( "/", userShouldBeLoggedIn, async function ( req, res ) {
  
  console.log(req)
  const { user_id } = req;
    try {
       const {name, description, media, isPrivate, isFinished, first} = req.body;
       const story = await models.Story.create({ name, description, UserId: user_id, media, isPrivate, isFinished, first })

       res.send({id:story.dataValues.id})
       

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