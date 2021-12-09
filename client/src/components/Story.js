import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "../services/api";
import Rating from "react-rating";
import "./Login.css";
import Thumbsup from "../img/Thumbsup.png";
import Dog from "../img/Dog.png";

import { useSpring, config, animated } from "@react-spring/web";

const axios = require("axios");

export default function Story() {
  const navigate = useNavigate();
  const { id, page } = useParams();
  const [story, setStory] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState(null);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => getCurrentNode(page), [page]);

  useEffect(() => getStory(id), []);

  const getCurrentNode = async (id) => {
    setLoading(true);
    const node = await api.getNode(id);
    console.log(node);
    setCurrentNode(node);
    console.log(data);
    setLoading(false);
  };

  const [flip, set] = useState(false);

  const getStory = async (id) => {
    try {
      const { data } = await axios.get(`/stories/${id}/`);
      setStory(data);
    } catch (error) {
      console.log(error);
    }
  };

  //   const getImage = async () => {
  //     import placeholder from "../img/placeholder.jpg"
  //     setImage(placeholder)
  //   }

  const { scroll } = useSpring({
    scroll: (currentNode && currentNode.length - 1) * 50,
    from: { scroll: 0 },
    reset: false,
    reverse: flip,
    delay: 200,
    config: config.molasses,
    // onRest: () => set(!flip),
  });

  return (
    <div className="h-screen flex" style={{ width: "100%", height: "100%" }}>
      {/* BARRA LATERAL - DESCRIPCIÓN DE LA STORY*/}
      <div className="flex w-1/4 bg-white justify-around items-top">
        
        {story && (
        <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-4 xxl:col-span-4 px-6 py-6">
        <p className="text-gray-600 font-semibold uppercase mt-6 mb-8">STORY DETAILS</p>
          <div className="bg-white rounded-xl p-4 shadow-xl border-2 border-gray-200">
            <div className="flex flex-col justify-center items-center">
              <div className="">
                <img
                  src={story.media}
                  className="object-cover h-48 w-80 rounded-lg"
                />
              </div>
              <p className="font-semibold text-xl mt-1">{story.name}</p>
              <p className="font-semibold text-base text-blue-500">{story.category}</p>

              <div className="relative p-4 shadow-xl w-full h-32 mt-4">
                <div className="absolute inset-0 bg-green-400"></div>
                <div className="relative w-80 h-full px-4s">
                  <div>
                    <h3 className="text-center text-white text-xl font-bold">What is it about?</h3>
                    <h3 className="text-center text-white mt-2">
                      {story.description}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
          <div className="bg-white border-2 border-gray-200 p-3 rounded-xl shadow-xl flex items-center justify-between mt-4">
            <div className="flex space-x-6 items-center">
              <img
                src={Dog}
                className="w-auto h-24 rounded-lg"
              />
              <div>
                <p className="font-semibold text-lg">Created by</p>
                <p className="font-semibold text-gray-400">
                  {story.User.username}
                </p>
              </div>
            </div>
          </div>
     
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 shadow-xl mt-4">
            <div className="flex flex-col justify-center items-center">
              <img
                src={Thumbsup}
                className="w-auto h-40 rounded-lg"
              />
              <p className="font-semibold text-xl">Rating</p>
              <p className="font-semibold text-sm text-gray-400 text-center">
                cat ipsum. meow meow
              </p>
              <div className="mt-5"><Rating /></div>
            </div>
          </div>
        </div>
      )}

      </div>

      {/* SECCIÓN DE LA STORY */}
      <div className="w-3/4 bg-grayCustom1 justify-center">
          {story && (
          <p className="mt-80 mb-5 flex flex-cols items-center justify-center text-2xl font-bold leading-none tracking-normal text-gray-900 md:tracking-tight">
            Start playing {story.name}
          </p>
          )}
          <p className="mb-6 flex flex-cols items-center justify-center leading-none tracking-normal text-gray-900 md:tracking-tight">
            What will happen next? You decide
          </p>
        
        <div className="">
          {loading && <div>loading</div>}
          {currentNode && (
            <div className="flex flex-col items-center justify-center">
              <div className="text-xl text-white flex flex-col items-center justify-center mb-5 bg-gradient-to-r from-first to-purple-500 rounded-lg shadow-2xl flex flex-col items-center justify center px-52 py-2 w-5/12">
                {currentNode.situation}
              </div>

              <p className="mb-3 text-gray-800 mt-10">
                Scroll and select an option from the list below
              </p>
              <div className="flex items-center flex-none px-4 bg-gradient-to-r from-first to-purple-500 rounded-b-none h-7 w-5/12 rounded-t">
                <p className="text-white font-medium flex items-center justify-center">
                  Possible Scenarios
                </p>
              </div>
              <div className="w-5/12 bg-white rounded-b shadow-lg">

                <animated.div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 60,
                    overflow: "auto",
                    fontSize: "1em",
                    padding: 5,
                  }}
                  scrollTop={scroll}
                >
                  {currentNode.Start ? (
                    currentNode.Start.map((edge) => (
                      <a

                        className="grid grid-cols-1 divide-y divide-gray-300 hover:underline"
                        onClick={() => navigate(`/story/${id}/end`)}
                        // key={`${word}_${i}`}
                        style={{
                          width: "100%",
                          height: 40,
                          textAlign: "center",
                        }}

                      >
                        {edge.option}
                      </a>
                    ))
                  ) : (
                    <a
                      className="flex flex-col items-center justify-center hover:underline"
                      onClick={() => navigate(`/story/${id}/1`)}
                      style={{ width: "100%", height: 50, textAlign: "center" }}
                    >
                      finish
                    </a>
                  )}
                </animated.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
