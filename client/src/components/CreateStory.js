import React, { useState, useEffect } from "react";
import "./CreateStory.css"

const axios = require('axios');

export default function CreateStory( {storyId, storyName} ) {  
  // const {situation, media, StoryId, option} = object;
  // new node to be posted to DB
  const [newNode, setNewNode] = useState({
    situation: "",
    storyId: storyId,
    option: ""
  });
  
  const [nodeList, setNodeList] = useState([])
  // const [edge, setEdge] = useState({option:""})
  const [startNodeId, setStartNodeId] = useState(null)
  const [nextNodeId, setNextNodeId] = useState(null) 
  const [nodeExists, setNodeExists] = useState(false)

  useEffect(() => {
    getNodes();
  }, []); //TODO: something missing here

  // gets all nodes related to a storyId
  async function getNodes() {
    try {
      const { data } = await axios.get(`/stories/${newNode.storyId}/nodes`); //
      setNodeList(data)
    } catch (error) {
      console.error(error);
    }
  }

  // controls conditional rendering of node form (toggle: new node vs existing node)
  const handleButton = (event) => {
    event.preventDefault();
    setNodeExists((state) => (!state));
  };

  // changes node values for inputs
  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewNode((state) => ({ ...state, [name]: value }));
  };

  // on submit, if it is a new node it calls createNode. In any case, it creates edge.
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!nodeExists) {
      createNode();
    }
    addEdges();
  };

     
  // creates new node in DB
  async function createNode() {
    try {
      const {situation, storyId} = newNode;
      const response = await axios.post('/nodes', {
        method: "POST",
        data: {situation, storyId},
      });
      const nodeId = await response.data;
      setStartNodeId(nodeId.id)
    } catch (error) {
      console.error(error);
    }
  }

  // creates edge between two nodes in DB 
  async function addEdges () {
    try {
      const response = await axios.put(`/nodes/${startNodeId}/edges`, {}); //TODO: STUFF MISSING HERE 
      const nextId = await response.data;
      setNextNodeId(nextId.id)
    } catch (error) {
      console.log(error);
    }
  };

    return (
        <div>
            <h3>{storyName}</h3><br/>
            <form>
            <div>
                WHAT? The current scenario: <br/>{startNodeId ? startNodeId : "Create you first scenario below!"}
            </div>
            <br/>
            <div>
                NEXT SCENARIO<br/>
                SELECT<button onClick={handleButton}>--toggle--</button>CREATE
            </div>
            </form>
            <br/><br/>
            <div>
                <label>If player chooses:</label><br/><textarea name="option" rows="1" cols="50" onChange={handleChange} placeholder="Write the choice that will lead to the next scenario"></textarea><br/>
            </div>
            {
            nodeExists 
              ? <div>
                  <label for="nodes">WHAT NEXT? Choose next scenario</label>
                  <select name="nodes" id="nodes">
                      {!nodeList && <option key="0" selected="true" disabled="disabled">no scenarios created yet!</option>}
                      {nodeList && nodeList.map((node) =>
                        <option key={node.id} value={node.id}>{node.situation}</option> 
                      )}
                  </select>
                </div>
              : <div>
                  <label>WHAT NEXT?</label><br/>
                  <textarea name="situation" rows="4" cols="50" onChange={handleChange} placeholder="Write the next scenario"></textarea><br/>
                </div>
            }
            <br/>
            <br/><br/>
            <div>
                <button onClick={handleSubmit}>SAVE</button><br/><br/>
                <button>CREATE/SELECT ANOTHER CHOICE</button>----
                <button>CONTINUE STORYLINE</button>
                <br/><br/>
                <button>FINISH STORY</button>
            </div>
            {nodeList && nodeList.map((node) =>
            <div key={node.id}>{node.situation}</div> )}
            
        </div>
    )
}
