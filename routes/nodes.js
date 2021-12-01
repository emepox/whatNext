var express = require("express");
var router = express.Router();
var models = require("../models");

const userShouldBeLoggedIn = require("./middleware/userShouldBeLoggedIn");


// creates a node (without edges)
router.post("/", async function (req, res) {
    try {
       const {situation, StoryId} = req.body;
       const node = await models.Node.create({situation, StoryId})

       res.send({id:node.dataValues.id, situation:node.dataValues.situation})
       

    } catch (error) {
      res.status(500).send(error);
    }

});


router.put("/:id/edges", userShouldBeLoggedIn, async function (req, res) {
    try {
        const {id} = req.params;  // ID of parent node
        const { user_id } = req;
        const {nextId, situation, StoryId, option} = req.body; // only for new nodes

        // find parent node
        const startNode = await models.Node.findOne(
            {
                where: { id }
            }
          );

        // find parent node
        const nextNode = await models.Node.findOne(
            {
                where: { id }
            }
          );
        
        

        if (!node){
            node = await models.Node.create({situation, StoryId})
        }

        await node.setNext(id, {through: { option: option }})

        res.send({id:node.dataValues.id})
       

    } catch (error) {
      res.status(500).send(error);
    }

});


// router.put("/:id/edges", async function (req, res) {
//     try {
//         const {id} = req.params;  // ID of parent node
//         const children = [];

//         for (object of req.body){
//             const {situation, StoryId, option} = object;
//             const node = await models.Node.create({situation, StoryId});
            
//             await node.addNext(id, {through: { option: option }})

//             children.push(node.dataValues.id)
//         }

//        res.send(children)
       

//     } catch (error) {
//       res.status(500).send(error);
//     }

// });

//deletes node by id
router.delete("/:id", async function (req, res) {
    try{
        const { id } = req.params
        await models.Node.destroy(
            {
                where: { id }
            }
        );
    
    res.send("Node successfully deleted!")
    
    } catch (error) {
    res.status(500).send(error);
    }
});



module.exports = router;