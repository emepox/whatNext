import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "../services/api";
import Rating from "react-rating";
import "./Login.css";
import Dog from "../img/Dog.png";
import Textbox from "../img/Textbox.png";

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
  const [ selectedId, setSelectedId ] = useState( 0 );
  const [rating, setRating] = useState({});
  

  useEffect(() => getCurrentNode(page), [page]);

  useEffect( () => getStory( id ), [] );
  
    useEffect(() => {
      requestRating();
    }, []);

    const requestRating = async () => {
      try {
        const { data } = await axios.get(`/stories/${id}/rating`);
        setRating(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

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
            <p className="text-xl font-bold text-gray-800 flex justify-center items-top m-10">
              STORY DETAILS
            </p>
            <div className="bg-white rounded-xl p-4 shadow-xl border-2 border-gray-200">
              <div className="flex flex-col justify-center items-center">
                <div className="">
                  <img
                    src={story.media}
                    className="object-cover h-48 w-80 rounded-lg"
                  />
                </div>
                <p className="font-semibold text-xl mt-1">{story.name}</p>
                <p className="font-semibold text-base text-blue-500">
                  {story.category}
                </p>

                <div className="relative p-4 shadow-xl w-full h-32 mt-4">
                  <div className="absolute inset-0 bg-blue-400 rounded-lg"></div>
                  <div className="relative w-80 h-full px-4s">
                    <div>
                      <h3 className="text-center text-white text-xl font-bold">
                        What is it about?
                      </h3>
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
                <img src={Textbox} className="w-auto h-24 rounded-lg" />
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
                <p className="font-semibold text-xl mb-3">Global Rating</p>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <p className="text-gray-600 font-bold text-sm ml-1">
                    <span className="mr-2">{rating.average}</span>
                    <span className="text-gray-500 font-normal">
                      ({rating.amount} reviews)
                    </span>
                  </p>
                </div>
                {/* <div className="mt-5"><Rating /></div> */}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECCIÓN DE LA STORY */}
      <div className="w-3/4 bg-grayCustom1 flex flex-col items-center justify-center">
        
          {story && (
            <div>
              <p className="mb-5 text-2xl font-bold text-gray-900">
                Now playing {story.name}
              </p>
            </div>
          )}
        
        <div className="flex flex-col items-center justify-center">
          <p className="mb-6 text-gray-900">
            What will happen next? You decide
          </p>
        </div>

        {loading && <div>loading</div>}
        {currentNode && (
        <div className="justify-center flex flex-col items-center justify-center py-10 px-96">
          
            <div className="w-custom">
              <div className="bg-white border-2 border-gray-200 rounded-lg py-3 text-2xl text-gray-700 flex flex-col items-center justify-center">
                {currentNode.situation}
              </div>
        

              <p className="mb-3 text-gray-500 mt-10">
                Scroll and select an option from the list below
              </p>
              <div className="flex items-center flex-none px-4 bg-purple-500 rounded-b-none h-7 w-full rounded-t">
                <p className="text-white font-medium flex items-center justify-center">
                  Possible Scenarios
                </p>
              </div>

              <div className="w-full bg-white rounded-b border-2 border-gray-200 mb-3">
                <animated.div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 100,
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
            </div>
          )}
        
      </div>
    </div>
  );
}
