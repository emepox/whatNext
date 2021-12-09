import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Card from "./Card";
import Texts from "../img/Texts.png";

export default function GridStories({ isProfile, user }) {
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
    console.log(user);
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

  const handlePreview = async (id) => {
    navigate(`/story/${id}/preview`);
  };

  const handlePlay = async (id, first) => {
    navigate(`/story/${id}/${first}`);
  };

  //TODO: MAKE THIS WORK
  const handleEdit = (id) => {
    console.log(`Click edit ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`stories/${id}`);
      requestData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      {/* SEARCH / FILTER SECTION */}
      
      <div className="flex w-1/4 bg-white justify-around items-top">
        <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-4 xxl:col-span-4 px-6 py-6">
          <p className="tracking-wide text-md text-purple-600 font-semibold uppercase mb-10">
            Search and filter
          </p>

          {/* Search and filter */}
          <div className="bg-white rounded-xl p-4 shadow-xl border-2 border-gray-200">
            <div className="mt-3">
              <p className="mb-2 text-gray-700">Search for</p>
              <input
                className="border-2 border-gray-300 pr-10 pl-2 py-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mb-5"
                name="searchWord"
                placeholder="title, description..."
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </div>

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
          </div>

          {/* Want to create story? */}
          <div className="flex items-center bg-white rounded-xl p-4 shadow-xl border-2 border-gray-200 mt-7">
            <img src={Texts} className="mt-5 w-6/12"></img>
            <div className="">      
              <p className="font-semibold text-lg text-gray-600 mb-5">Want to create a story?</p>
              <a href="/start" className="bg-blue-500 rounded-full p-2 text-white">Let's go!</a>
            </div>
          </div>
        </div>
      </div>
      

      {/* CARDS DISPLAY SECTION */}
      <div className="w-4/5 h-screen bg-grayCustom2 justify-center">
        {isProfile ? (
          <p className="text-3xl font-bold text-gray-700 flex justify-start items-top m-20">
            Hello {user && user}! check all the stories
          </p>
        ) : (
          <p className="text-3xl font-bold text-gray-700 flex justify-start items-top m-20">
            Check All The Stories
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
                    handleEdit={() => handleEdit(story.id)}
                    handleDelete={() => handleDelete(story.id)}
                    handlePlay={() => handlePlay(story.id, story.first)}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
