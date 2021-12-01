import React, { useState, useEffect } from "react";
import "./CreateGame.css"

const axios = require('axios');

export default function CreateGame() {  
  // const {situation, media, StoryId, option} = object;
  // new node to be posted to DB
  const [newNode, setNewNode] = useState({
    situation: "",
    storyId: "",
    option: ""
  });
  
  const [nodeList, setNodeList] = useState([])
  // const [edge, setEdge] = useState({option:""})
  const [startNodeId, setStartNodeId] = useState(null)
  const [nextNodeId, setNextNodeId] = useState(null) 
  const [nodeExists, setNodeExists] = useState(false)

  // calls getFilteredItems() whenever colors, seasons or categories changes
  useEffect(() => {
    getNodes();
  }, []); //TODO: something missing here

  // creates new node in DB
  async function getNodes() {
    try {
      const { data } = await axios.get(`/stories/${newNode.storyId}/nodes`); //
      // const nodes = await response.data;
      setNodeList(data)
    } catch (error) {
      console.error(error);
    }
  }

  // controls conditional rendering (new node or existing node)
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
    if (!nodeExists) createNode();
    addEdges();
  };

     
  // creates new node in DB
  async function createNode() {
    try {
      const response = await axios.post('/nodes', {
        method: "POST",
        data: newNode,
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
            <h3>"Jabalí unchained"</h3><br/>
            <form>
            <div>
                WHAT? The current scenario: <br/>Jabalí gets into a bar
            </div>
            <br/>
            <div>
                NEXT SCENARIO<br/>
                SELECT<button onClick={handleButton}>--toggle--</button>CREATE
            </div>
            </form>
            <br/><br/>
            <div>
                <label>Player chooses:</label><br/><textarea name="option" rows="1" cols="50" onChange={handleChange}></textarea><br/>
            </div>
            {!nodeExists && 
              <div>
                <label>WHAT NEXT? Type next scenario</label><br/>
                <textarea name="situation" rows="4" cols="50" onChange={handleChange}></textarea><br/>
              </div>}
            {nodeExists && 
            <div>
                <label for="nodes">WHAT NEXT? Choose next scenario</label>
                <select name="nodes" id="nodes">
                    {!nodeList && <option key="0" selected="true" disabled="disabled">no scenarios created yet!</option>}
                    {nodeList && nodeList.map((node) =>
                      <option key={node.id} value={node.id}>{node.situation}</option> 
                    )}
                </select>
            </div>}
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
