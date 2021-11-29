var express = require("express");
var router = express.Router();
var models = require("../models");

router.post("/", async function (req, res) {
    try {
       const {situation, media, StoryId} = req.body;
       const node = await models.Node.create({situation, media, StoryId})

       res.send({id:node.dataValues.id})
       

    } catch (error) {
      res.status(500).send(error);
    }

});

module.exports = router;