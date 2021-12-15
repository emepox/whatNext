import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Select from "react-select";
import "./Login.css";
import Texts from "../img/Texts.png";


export default function Searchbar({ 
  view, 
  user, 
  options, 
  setSearchQuery, 
  setCategoryFilters, 
  }){

  const auth = useAuth();
  const navigate = useNavigate();

  const handleMultiChange = (selectedOptions) => {
    setCategoryFilters((state) =>
      selectedOptions.map((selectedOption) => selectedOption.value)
    );
  };

  return (
    <div className="p-6">
      {/* Profile choices */}
      {(view==="profile" || view==="favs") && (
        <div className="flex flex-col justify-center items-center">
          <p className="text-3xl font-bold text-gray-700 flex justify-center items-top m-10">
            Hello {user && user.username}!
          </p>

          <div className="flex border-b border-gray-200">
            <button
              onClick={() => navigate("/profile")}
              className="fontAwesome flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 whitespace-nowrap focus:outline-none hover:border-gray-400 focus:border-blue-500 focus:text-blue-500"
            >
              <span>&#xf15c;</span>
              <span className="mx-1 text-sm sm:text-base"> My WhatNexts </span>
            </button>

            <button
              onClick={() => navigate("/favourites")}
              className="fontAwesome flex items-center h-10 px-2 py-2 -mb-px text-center text-gray-700 bg-transparent border-b-2 border-transparent sm:px-4 -px-1 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 focus:border-blue-500 focus:text-blue-500"
            >
              <span>&#xf004;</span>
              <span className="mx-2 text-sm sm:text-base"> Favourites </span>
            </button>
          </div>
        </div>
      )}
      {/* End of profile choices */}

      {/* FILTER BOX */}
      <div className="bg-white rounded-xl p-4 shadow-xl border-2 border-gray-200 mt-7">
        <p className="tracking-wide text-md text-purple-600 font-semibold uppercase">
          Search and filter
        </p>

        {/* Search Bar */}
        <div className="mt-3">
          <p className="mb-2 text-gray-700">Search for</p>
          <input
            className="border border-gray-300 pr-10 pl-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mb-5 rounded-lg"
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
              onChange={(selectedOptions) => handleMultiChange(selectedOptions)}
              theme={(theme) => ({
                ...theme,
                borderRadius: "10px",
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
      {/* END OF FILTER BOX */}
      <div className="flex flex-wrap items-center bg-white rounded-xl p-4 shadow-xl border-2 border-gray-200 mt-7">
        <img src={Texts} className="w-32 mr-10 basis-1/3"></img>
        <div className="basis-2/3">
          <p className="font-semibold text-lg text-gray-600 mb-5">
            Want to create a WhatNext?
          </p>
          <a
            href={auth.isLoggedIn ? "/start" : "/login"}
            className="bg-blue-500 rounded-full p-2 text-white"
          >
            Let's go!
          </a>
        </div>
      </div>
      {/* End of Want to create story? */}
    </div>
  );
}
