import React, { useState, useEffect } from "react";
import "./CreateStory.css"
import CreateNode from "./CreateNode";
import AddEdge from "./AddEdge";
import EditNode from "./EditNode";
const axios = require('axios');

export default function CreateStory( {postedStory} ) {  
  // const {situation, media, StoryId, option} = object;
  // new node to be posted to DB
  const {id, name } = postedStory
  const [nodeList, setNodeList] = useState([])
  const [toggle, setToggle] = useState("create")

  // useEffect(() => {
  //   if (!startNode) addFirstNode();
  // }, []); 

  useEffect(() => {
    getNodes();
  }, []); 

  // gets all nodes related to a storyId
  async function getNodes() {
    try {
      const { data } = await axios.get(`/stories/${id}/nodes`); 
      setNodeList(data)
    } catch (error) {
      console.error(error);
    }
  }

  // controls conditional rendering of node form (toggle: new node vs existing node)
  const handleToggle = (event) => {
    event.preventDefault()
    setToggle(event.target.name);
  };

  const renderSwitch = () =>{
    switch(toggle) {
      case 'create':
        return <CreateNode storyId={id} getNodes={getNodes} nodeList={nodeList}/>;
      case 'connect':
        return <AddEdge nodeList={nodeList}/>;
      case 'edit':
        return <EditNode getNodes={getNodes} nodeList={nodeList}/>;
     
    }
  }

  // changes node values for inputs


  // on submit, if it is a new node it calls createNode. In any case, it creates edge.
     
  

  // creates edge between two nodes in DB 
  

    return (
        <div id="StoryDetails">
            <h3>{name}</h3><br/>
            <form>
            <button name="create" onClick={handleToggle}>Create Situation</button>
            <button name="connect" onClick={handleToggle}>Connect Situations</button>
            <button name="edit" onClick={handleToggle}>Edit Situation</button>
            </form>
            {renderSwitch()}
            <br/>
            ALL SAVED SCENARIOS
            {nodeList && nodeList.map((node) =>
            <div key={node.id}>{node.situation}</div> )}
            
        </div>
    )
}
