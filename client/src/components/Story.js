import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "../services/api";
import "./Login.css";
import Textbox from "../img/Textbox.png";

const axios = require("axios");

export default function Story() {
  const navigate = useNavigate();
  const { id, page } = useParams();
  const [story, setStory] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState({});

  useEffect(() => getCurrentNode(page), [page]);

  useEffect(() => getStory(id), []);

  useEffect(() => {
    requestRating();
  }, []);

  const requestRating = async () => {
    try {
      const { data } = await axios.get(`/api/stories/${id}/rating`);
      setRating(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getCurrentNode = async (id) => {
    setLoading(true);
    const node = await api.getNode(id);
    setCurrentNode(node);
    setLoading(false);
  };

  const getStory = async (id) => {
    try {
      const { data } = await axios.get(`/api/stories/${id}/`);
      setStory(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="h-screen lg:flex md:flex-none"
      style={{ width: "100%", height: "100%" }}
    >
      {/* BARRA LATERAL - DESCRIPCIÓN DE LA STORY*/}
      <div className="basis-1/5 bg-white justify-around items-top sm:flex-none">
        {story && (
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-4 xxl:col-span-4 px-6 py-6">
            <p className="text-xl font-bold text-gray-800 flex justify-center items-top m-10">
              NOW PLAYING
            </p>
            <div className="bg-white rounded-xl p-4 shadow-xl border-2 border-gray-200">
              <div className="flex flex-col justify-center items-center">
                <div className="">
                  <img
                    src={story.media}
                    className="object-cover h-48 w-80 rounded-lg"
                    alt="media"
                  />
                </div>
                <p className="font-semibold text-xl mt-1">{story.name}</p>
                <p className="uppercase tracking-wide text-sm font-semibold text-blue-400">
                  {story.category}
                </p>

                <div className="p-4 bg-blue-400 rounded-lg shadow-xl w-full h-32 mt-4">
                  <div className=" h-full px-4s">
                    <div>
                      <h3 className="text-center text-white mt-2 break-normal">
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
                  src={Textbox}
                  className="w-auto h-24 rounded-lg"
                  alt="something more"
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
      <div className="basis-4/5 bg-grayCustom1 flex flex-col items-center justify-center p-6 w-full">
        {story && (
          <div>
            <p className="mb-5 text-2xl font-bold text-gray-900">
              Now playing {story.name}
            </p>
          </div>
        )}

        {loading && <div>loading</div>}
        {currentNode && (
          <div className="md:w-8/12 mx-auto rounded border">
            <div className="bg-white rounded-lg p-10 shadow-sm overflow-y-auto h-auto">
              <p className="text-xl font-medium text-purple-500">
                {currentNode.situation}
              </p>
              <p className="text-sm font-light text-gray-600 my-3">
                What will happen next? You decide
              </p>

              <div className="h-1 w-full mx-auto border-b my-5"></div>

              {/* OPTIONS */}
              {currentNode.Start.length ? (
                currentNode.Start.map((edge, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-start justify-center transition hover:bg-indigo-50 cursor-pointer space-x-5 px-5 h-16"
                  >
                    <button
                      onClick={() => navigate(`/story/${id}/${edge.next}`)}
                      style={{
                        width: "100%",
                        height: 40,
                        textAlign: "center",
                      }}
                    >
                      {edge.option}
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-start justify-center transition hover:bg-indigo-50 cursor-pointer space-x-5 px-5 h-16">
                  <button
                    onClick={() => navigate(`/story/${id}/end`)}
                    style={{ width: "100%", height: 40, textAlign: "center" }}
                  >
                    Finish
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
