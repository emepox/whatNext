var express = require("express");
const { startsWith } = require("sequelize/dist/lib/operators");
var router = express.Router();
var models = require("../models");

const userShouldBeLoggedIn = require("./middleware/userShouldBeLoggedIn");

// GETS STORY by ID, including nodes and edges
router.get("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    const { dataValues } = await models.Node.findOne({
      where: { id },
      include: { model: models.Node, as: "Start", attributes: ["id"] },
    });
    const result = {
      ...dataValues,
      Start: dataValues.Start.map((e) => e.Edge),
    };
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// CREATES NODE (without edges)
router.post("/", async function (req, res) {
  try {
    const { situation, StoryId } = req.body;
    const node = await models.Node.create({ situation, StoryId });

    res.send({ id: node.dataValues.id, situation: node.dataValues.situation });
  } catch (error) {
    res.status(500).send(error);
  }
});

// EDITS NODE 
router.put("/edit/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await models.Node.update(req.body, {
      where: { id },
    });

    res.send("Situation successfully updated!");
  } catch (error) {
    res.status(500).send(error);
  }
});


//DELETES NODE 
router.delete("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    await models.Node.destroy({
      where: { id },
    });

    res.send("Node successfully deleted!");
  } catch (error) {
    res.status(500).send(error);
  }
});


// CREATES/EDITS AN EDGE
router.put("/:id/edges", userShouldBeLoggedIn, async function (req, res) {
  try {
    const { id } = req.params; // ID of parent node
    const { nextId, option } = req.body; // only for new nodes

    let nextNode = await models.Node.findOne({
      where: { id: nextId },
    });
    await nextNode.addNext(+id, { through: { option: option } });

    res.send({ message: "edge established" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//DELETES EDGE
router.delete("/:id/edges", userShouldBeLoggedIn, async function (req, res) {
    try {
      const { id } = req.params; // ID of parent node
      const { nextId } = req.body; // only for new nodes
      // console.log(typeOf(StoryId))
  
      let nextNode = await models.Node.findOne({
        where: { id: nextId },
      });
      await nextNode.removeNext(+id);
  
      res.send({ message: "edge removed" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// EDITS NODE POSITION on CreateStory
router.put("/:id/coords", async function (req, res) {
    try {
      const { id } = req.params;
      const node = await models.Node.update(req.body, {
        where: { id },
      });
  
      res.send("Position successfully updated!");
    } catch (error) {
      res.status(500).send(error);
    }
  });



module.exports = router;
