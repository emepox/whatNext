var express = require("express");
const { startsWith } = require("sequelize/dist/lib/operators");
var router = express.Router();
var models = require("../models");

const userShouldBeLoggedIn = require("./middleware/userShouldBeLoggedIn");


router.get("/:id", async function (req, res) {
    const {id} = req.params
    try {
        const node = await models.Node.findOne({ where: { id }, include:{model:models.Node, as: "Start", attributes:["id"]}})

       res.send(node)

    } catch (error) {
      res.status(500).send(error);
    }

});

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
        // console.log(typeOf(StoryId))
        
        let nextNode = {}
        // find child node or create it from scratch
        if (+nextId){
            nextNode = await models.Node.findOne(
                {
                    where: { id }
                }
            );
        } else {nextNode = await models.Node.create({situation, StoryId})}
        console.log(nextNode)
        await nextNode.setNext(+id, {through: { option: option }})

        res.send({id:nextNode.dataValues.id})
       

    } catch (error) {
      res.status(500).send(error.message);
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