import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Noty from "noty";
import "../../node_modules/noty/lib/themes/sunset.css";
import "../../node_modules/noty/lib/noty.css";
import "./Login.css";

import FlowChart from "./FlowChart";

const axios = require("axios");

export default function CreateStory() {
  const { state } = useLocation();
  const { id, name } = state;
  const [text, setText] = useState("");
  const [nodeList, setNodeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getNodes();
  }, []);

  // gets all nodes related to a storyId
  async function getNodes() {
    try {
      const { data } = await axios.get(`/api/stories/${id}/nodes`);
      setNodeList(data);
    } catch (error) {
      console.error(error);
      new Noty({
        theme: "sunset",
        type: "error",
        layout: "topRight",
        text: "Ouch! Something went wrong 😑... Try again!",
        timeout: 2000,
      }).show();
    }
  }

  const handleChange = (event) => {
    setText(event.target.value);
  };

  async function createNode(event) {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/nodes", {
        situation: text,
        StoryId: id,
      });

      if (!nodeList.length)
        await axios.put(`/api/stories/${id}/first`, { firstId: data.id });
      getNodes();
      setText("");
      new Noty({
        theme: "sunset",
        type: "success",
        layout: "topRight",
        text: "New scenario saved!",
        timeout: 2000,
      }).show();
    } catch (error) {
      console.error(error);
      new Noty({
        theme: "sunset",
        type: "error",
        layout: "topRight",
        text: "Ouch! Something went wrong 😑... Try again!",
        timeout: 2000,
      }).show();
    }
  }

  const handleButton = (event) => {
    event.preventDefault();
    finishStory();
  };

  async function finishStory() {
    try {
      await axios.put(`/api/stories/${id}/finish`);
      new Noty({
        theme: "sunset",
        type: "success",
        layout: "topRight",
        text: "Your WhatNext is ready to go! 🚀",
        timeout: 1000,
        callbacks: {
          onShow: function () {
            navigate(`/play`);
          },
        },
      }).show();
    } catch (error) {
      console.error(error);
      new Noty({
        theme: "sunset",
        type: "error",
        layout: "topRight",
        text: "Ouch! Something went wrong 😑... Try again!",
        timeout: 2000,
      }).show();
    }
  }

  return (
    <div className="h-screen">
      <div className="bg-white p-2 md:py-4 md:px-20 h-full">
          <h3 className="text-4xl text-bold text-gray-700 flex flex-col items-center justify-center mb-4">
            {name}
          </h3>
          <hr />
          <form className="mt-4" onSubmit={createNode}>
            <p className="text-gray-700 mb-3">
              Add a situation:{" "}
              <i>Player will read this before making a choice</i>
            </p>
            <textarea
              rows="2"
              value={text}
              onChange={handleChange}
              placeholder="Type in a scenario"
              className="w-full border-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            ></textarea>
            <button className="text-white bg-green-400 py-2 px-3 rounded-full m-2 hover:bg-green-500 hover:shadow-lg">
              save
            </button>
          </form>
          <div className="h-3/5">
            <FlowChart getNodes={getNodes} nodeList={nodeList} />
          </div>
          <button
            name="finish"
            onClick={handleButton}
            className="text-white bg-green-400 p-2 rounded-full m-2 hover:bg-green-500 hover:shadow-lg"
          >
            save story
          </button>
          <br />
      </div>
    </div>
  );
}
