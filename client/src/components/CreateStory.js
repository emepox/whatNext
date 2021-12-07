import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateNode from "./CreateNode";
import AddEdge from "./AddEdge";
import EditNode from "./EditNode";
import DeleteNode from "./DeleteNode";
import Noty from 'noty';
import "../../node_modules/noty/lib/themes/mint.css";
import "../../node_modules/noty/lib/noty.css";
const axios = require("axios");

export default function CreateStory({ postedStory }) {
  const { id, name } = postedStory;
  const [nodeList, setNodeList] = useState([]);
  const [toggle, setToggle] = useState("create");
  const navigate = useNavigate();

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
      case "delete":
        return <DeleteNode getNodes={getNodes} nodeList={nodeList} />;  
    }
  };

  const handleButton = (event) => {
    event.preventDefault();
    finishStory();
  }

  async function finishStory() {
  try {
    await axios.put(`/stories/${id}/finish`);
    new Noty({
      theme: 'mint',
      type: 'success',
      layout: 'topRight',
      text: 'Your WhatNext is ready to go! 🚀',
      timeout: 2000,
      callbacks: {
        afterClose: function () {
          navigate(`/play`);
        }
      }
    }).show();
  } catch (error) {
    console.error(error);
    new Noty({
      theme: 'mint',
      type: 'error',
      layout: 'topRight',
      text: "Ouch! Something went wrong 😑... Try again!",
      timeout: 2000
    }).show();
  }
}

  return (
    <div >
      <div>
      <h3 className="text-2xl font-mono italic flex flex-col items-center justify-center text-white mb-4">{name}</h3>
      <hr/>
      <br/>
      <p className="text-white font-mono mb-3"> Instructions:
      <ol>
        <li> 1. Create at least two scenarios by clicking on "Create scenario". Do not forget to save!</li>
        <li> 2. Add a choice that, if made by the player, will connect two scenarios by clicking on "Connect scenarios".</li>
        <li> 3. If you need it, you can also edit or delete saved scenarios</li>
        <li> 4. When your WhatNext is ready, click on "WhatNext completed!" </li>
      </ol>
      </p><br/>
      <hr/>
      <form className="flex space-x-4 mt-4">
        <button name="create" onClick={handleToggle} className="bg-yellow-400 p-2 rounded m-2 hover:bg-yellow-500 hover:shadow-lg">
          Create Scenario
        </button>
        <button name="connect" onClick={handleToggle} className="bg-yellow-400 p-2 rounded m-2 hover:bg-yellow-500 hover:shadow-lg">
          Connect Scenarios
        </button>
        <button name="edit" onClick={handleToggle} className="bg-yellow-400 p-2 rounded m-2 hover:bg-yellow-500 hover:shadow-lg">
          Edit Scenario
        </button>
        <button name="delete" onClick={handleToggle} className="bg-yellow-400 p-2 rounded m-2 hover:bg-yellow-500 hover:shadow-lg">
          Delete Scenario
        </button>
        <button name="finish" onClick={handleButton} className="bg-green-400 p-2 rounded m-2 hover:bg-green-500 hover:shadow-lg">
          Story Completed!
        </button>
      </form>
      <br/>
      </div>
      <div>
      {renderSwitch()}
      <br />
      </div>
      <div>
        ALL SAVED SCENARIOS
        {nodeList &&
        nodeList.map((node) => <div key={node.id}>{node.situation}</div>)}
      </div>
    </div>
  );
}
