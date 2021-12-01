var express = require("express");
var router = express.Router();
var models = require("../models");

// gets all nodes 
router.get("/", async function (req, res) {
    try {
        const {StoryId} = req.body;
        const nodes = await models.Node.findAll(
        {
            attributes: ['id', 'situation'],
            where: { StoryId: StoryId },
        }
      );
  
      res.send(stories);
      
    } catch (error) {
      res.status(500).send(error);
    }
});


// creates a node (without edges)
router.post("/", async function (req, res) {
    try {
       const {situation, StoryId} = req.body;
       const node = await models.Node.create({situation, StoryId})

       res.send({id:node.dataValues.id})
       

    } catch (error) {
      res.status(500).send(error);
    }

});


router.put("/:id/edges", async function (req, res) {
    try {
        const {id} = req.params;  // ID of parent node

        const node = await models.Node.findOne(
            {
                where: { id }
            }
          );
        
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