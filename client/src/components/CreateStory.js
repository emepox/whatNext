import React, { useState, useEffect } from "react";
import "./CreateStory.css";
import CreateNode from "./CreateNode";
import AddEdge from "./AddEdge";
import EditNode from "./EditNode";
const axios = require("axios");

export default function CreateStory({ postedStory }) {
  const { id, name } = postedStory;
  const [nodeList, setNodeList] = useState([]);
  const [toggle, setToggle] = useState("create");

  useEffect(() => {
    getNodes();
  }, []);

  // gets all nodes related to a storyId
  async function getNodes() {
    try {
      const { data } = await axios.get(`/stories/${id}/nodes`);
      setNodeList(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleToggle = (event) => {
    event.preventDefault();
    setToggle(event.target.name);
  };

  const renderSwitch = () => {
    switch (toggle) {
      case "create":
        return (
          <CreateNode storyId={id} getNodes={getNodes} nodeList={nodeList} />
        );
      case "connect":
        return <AddEdge nodeList={nodeList} />;
      case "edit":
        return <EditNode getNodes={getNodes} nodeList={nodeList} />;
    }
  };

  return (
    <div id="StoryDetails">
      <h3 className="p-3 text-xl ">{name}</h3>
      <form className="flex space-x-4">
        <button name="create" onClick={handleToggle}>
          Create Situation
        </button>
        <button name="connect" onClick={handleToggle}>
          Connect Situations
        </button>
        <button name="edit" onClick={handleToggle}>
          Edit Situation
        </button>
      </form><br/>
      {renderSwitch()}
      <br />
      ALL SAVED SCENARIOS
      {nodeList &&
        nodeList.map((node) => <div key={node.id}>{node.situation}</div>)}
    </div>
  );
}
