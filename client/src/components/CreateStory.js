import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateStory.css";
import CreateNode from "./CreateNode";
import AddEdge from "./AddEdge";
import EditNode from "./EditNode";
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
    <div id="StoryDetails">
      <h3 className="p-3 text-xl ">{name}</h3>
      <form className="flex space-x-4">
        <button name="create" onClick={handleToggle}>
          Create Scenario
        </button>
        <button name="connect" onClick={handleToggle}>
          Connect Scenarios
        </button>
        <button name="edit" onClick={handleToggle}>
          Edit Scenario
        </button>
      </form><br/>
      {renderSwitch()}
      <br />
        <button name="finish" onClick={handleButton}>
          Story Completed!
        </button>
      <br />
      ALL SAVED SCENARIOS
      {nodeList &&
        nodeList.map((node) => <div key={node.id}>{node.situation}</div>)}
    </div>
  );
}
