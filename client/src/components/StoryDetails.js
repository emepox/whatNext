import { React, useState, useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useNavigate } from "react-router-dom";
import Noty from "noty";
import "../../node_modules/noty/lib/themes/sunset.css";
import "../../node_modules/noty/lib/noty.css";
import Texts from "../img/Texts.png";

const axios = require("axios");

export default function StoryDetails() {
  const parallax = useRef(null);
  const navigate = useNavigate();

  const categories = [
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Love",
    "Mystery",
    "Other",
  ];

  const [newStory, setNewStory] = useState({
    name: "",
    description: "",
    media: "",
    category: "",
    isPrivate: 0,
    isFinished: 0,
  });

  // changes newGame values for inputs
  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewStory((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createStory();
  };

  // creates new story in DB
  async function createStory() {
    try {
      const { data } = await axios("/api/stories", {
        method: "POST",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: newStory,
      });
      new Noty({
        theme: "sunset",
        type: "success",
        layout: "topRight",
        text: "New WhatNext template generated. It's time to fill it in! ⚡️",
        timeout: 1000,
        callbacks: {
          onShow: function () {
            navigate(`/create`, { state: { id: data.id, name: data.name } });
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

    <div className="bg-grayCustom2 h-screen">
          <div className="">
            <div className="flex justify-center">
              <div className="flex flex-col items-center justify-center mt-20">
              <img src={Texts} className="w-5/12" alt="text" />
              <p className="text-3xl font-bold text-gray-700 mt-5">
                A blank canvas for you
              </p>
              <p className="text-lg text-gray-700 mb-20 mt-3">
                Every big idea starts with a WhatNext
              </p>
            </div>
            </div>


            <div className="flex justify-center px-4 max-w-xl lg:max-w-2xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl bg-white p-11 space-y-4 shadow-xl opacity-90 flex-grow"
            >
              <div>
                <p className="font-medium self-center text-xl sm:text-3xl text-gray-800 flex flex-col items-center justify-center">
                  New WhatNext
                </p>
              </div>

              {/* add a brief explanation about what to do */}
              <div>
                <input
                  name="name"
                  value={newStory.name}
                  placeholder="Title"
                  onChange={handleChange}
                  className="border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full px-4 py-2"
                  required
                />
              </div>
              <div>
                <textarea
                  name="description"
                  rows="4"
                  onChange={handleChange}
                  placeholder="Add a brief summary"
                  className="w-full border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent px-4 py-2"
                  required
                ></textarea>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-gray-400">Category</p>
                </div>
                <div className='flex-grow'>
                  <select
                    name="category"
                    value={newStory.category}
                    onChange={handleChange}
                    className="w-full border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent px-4 py-2"
                    required
                  >
                    <option value="">Choose a category</option>
                    {categories.map((category, i) => (
                      <option key={i} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <input
                  maxLength="255"
                  name="media"
                  value={newStory.media}
                  placeholder="Add the URL of an image that illustrates your story"
                  onChange={handleChange}
                  className="border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-full px-4 py-2"
                  required
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <button className="bg-blue-500 px-6 py-2 text-white text-sm uppercase tracking-tight font-medium rounded-full hover:bg-purple-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
                  START WRITING!
                </button>
              </div>
            </form>
            </div>
          </div>
    </div>
  );
}
