import React from "react";
import useAuth from "../hooks/useAuth";
import Select from "react-select";
import "./Login.css";
import Texts from "../img/Texts.png";
import Options from "../img/Options.png";


export default function Searchbar({ 
  isProfile, 
  user, 
  options, 
  requestData, 
  setSearchQuery, 
  setCategoryFilters, 
  showFavourites }){
    
  const auth = useAuth();

  const handleMultiChange = (selectedOptions) => {
    setCategoryFilters((state) =>
      selectedOptions.map((selectedOption) => selectedOption.value)
    );
  };


  return (
        
        <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-4 xxl:col-span-4 px-6 py-6">
          {/* Profile choices */}
          { (isProfile) && 
          <div>
            <p className="text-3xl font-bold text-gray-700 flex justify-center items-top m-10">
            Hello {user && user}!
            </p>
            <div className="flex items-center bg-white rounded-xl p-4 shadow-xl border-2 border-gray-200 mt-7">
            <img src={Options} className="w-3/12"></img>
            {/* <span className="fontAwesome text-4xl text-blue-500 mr-10 ml-1">&#xf04e;</span> */}
            <div>
              <p className="font-semibold text-lg text-gray-600 mb-5 mx-4">
                What do you want to do?
              </p>
              <button
                onClick={() => requestData()}
                className="bg-blue-500 rounded-full p-2 text-white mx-3"
              >
                My WhatNext
              </button>
              <button
                onClick={() => showFavourites()}
                className="bg-blue-500 rounded-full p-2 text-white"
              >
                Go to favs
              </button>
            </div>
          </div>
          </div>}
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
          {/* END OF FILTER BOX */}
          <div className="flex items-center bg-white rounded-xl p-4 shadow-xl border-2 border-gray-200 mt-7">
            <img src={Texts} className="w-32 mr-10"></img>
            <div className="">
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
