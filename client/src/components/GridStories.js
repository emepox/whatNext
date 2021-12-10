import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Card from "./Card";
import Texts from "../img/Texts.png";


export default function GridStories({ isProfile, user, switchView }) {
  const navigate = useNavigate();
  const auth = useAuth();
  const [stories, setStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilters, setCategoryFilters] = useState([]);

  const options = [
    { value: "Action", label: "Action" },
    { value: "Comedy", label: "Comedy" },
    { value: "Drama", label: "Drama" },
    { value: "Horror", label: "Horror" },
    { value: "Love", label: "Love" },
    { value: "Mystery", label: "Mystery" },
    { value: "Other", label: "Other" },
  ];

  useEffect(() => {
    requestData();
  }, []);

  const requestData = async () => {
    try {
      if (isProfile) {
        const { data } = await axios("users/profile/", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        console.log(data);
        setStories(data);
      } else {
        const { data } = await axios("/stories/");
        console.log(data);

        setStories(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMultiChange = (selectedOptions) => {
    setCategoryFilters((state) =>
      selectedOptions.map((selectedOption) => selectedOption.value)
    );
  };

  const hasCategoryFilter = (story) => {
    return !categoryFilters.length || categoryFilters.includes(story.category);
  };

  const hasSearchFilter = (story) => {
    return (
      searchQuery === "" ||
      story.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handlePlay = async (id, first) => {
    navigate(`/story/${id}/${first}`);
  };

  const handleEdit = (id, name) => {
    navigate(`/create`, { state: { id, name } });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`stories/${id}`);
      requestData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFavourite = async (storyId) => {
    try {
      await axios('/users/favourites/', {
        method: "POST",
        headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {storyId: +storyId},
      });
      console.log(storyId)
      // requestData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      {/* SEARCH / FILTER SECTION */}
      <div
        className={
          isProfile
            ? "flex w-1/4 bg-white  justify-around items-top"
            : "flex w-1/4 bg-white  justify-around items-top h-screen"
        }
      >
        <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-4 xxl:col-span-4 px-6 py-6">
          <div className="bg-white rounded-xl p-4 shadow-xl border-2 border-gray-200">
            <p className="tracking-wide text-md text-purple-600 font-semibold uppercase">
              Search and filter
            </p>
            {isProfile ? (
              <p className="tracking-wide text-md text-purple-600 font-semibold uppercase">
                your WhatNext
              </p>
            ) : (
              ""
            )}

            {/* Search Bar */}
            <div className="mt-3">
              <p className="mb-2 text-gray-700">Search for</p>
              <input
                className="border-2 border-gray-300 pr-10 pl-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mb-5"
                name="searchWord"
                placeholder="title, description..."
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>
            {/* End of Search Bar */}

            {/* Category filter */}
            <div>
              <p className="mb-2 text-gray-700"> Category filter</p>
              <div className="rounded pr-20 mb-3">
                <Select
                  placeholder="Select category"
                  options={options}
                  isMulti
                  onChange={(selectedOptions) =>
                    handleMultiChange(selectedOptions)
                  }
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: "12px",
                    colors: {
                      ...theme.colors,
                      primary: "#7C3AED",
                      primary25: "#EDE9FE",
                    },
                  })}
                />
              </div>
            </div>
            {/* End of Category filter */}
          </div>

          {/* See favourite WhatNext? */}
          <div className="flex items-center bg-white rounded-xl p-4 shadow-xl border-2 border-gray-200 mt-7">
            <img src={Texts} className="mt-5 w-6/12"></img>
            <div className="">
              <p className="font-semibold text-lg text-gray-600 mb-5">
                See your favourite WhatNext
              </p>
              <button
                onClick={switchView}
                className="bg-blue-500 rounded-full p-2 text-white"
              >
                Go to favs
              </button>
            </div>
          </div>
          {/* End of Want to create story? */}
          {/* Want to create story? */}
          <div className="flex items-center bg-white rounded-xl p-4 shadow-xl border-2 border-gray-200 mt-7">
            <img src={Texts} className="mt-5 w-6/12"></img>
            <div className="">
              <p className="font-semibold text-lg text-gray-600 mb-5">
                Want to create a WhatNext?
              </p>
              <a
                href="/start"
                className="bg-blue-500 rounded-full p-2 text-white"
              >
                Let's go!
              </a>
            </div>
          </div>
          {/* End of Want to create story? */}
  
        </div>
      </div>

      {/* CARDS DISPLAY SECTION */}
      <div className="w-4/5 bg-grayCustom2 justify-center">
        {isProfile ? (
          <p className="text-3xl font-bold text-gray-700 flex justify-start items-top m-20">
            Hello {user && user}! Here are your <i>WhatNext</i>:
          </p>
        ) : (
          <p className="text-3xl font-bold text-gray-700 flex justify-start items-top m-20">
            All WhatNext
          </p>
        )}
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center grid grid-cols-4 gap-10">
            {stories &&
              stories
                .filter((story) => {
                  if (hasSearchFilter(story) && hasCategoryFilter(story))
                    return story;
                })
                .map((story) => (
                  <Card
                    story={story}
                    isProfile={isProfile}
                    handleEdit={() => handleEdit(story.id, story.name)}
                    handleDelete={() => handleDelete(story.id)}
                    handlePlay={() => handlePlay(story.id, story.first)}
                    handleFavourite={() => handleFavourite(story.id)}
                  />
                ))}
          </div>
        </div>
      </div>
      {/* END OF CARDS DISPLAY SECTION */}
    </div>
  );
}
