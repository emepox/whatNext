import React, {useState, useEffect} from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Card from "./Card";


export default function Favourites({isProfile, user}) {

  const navigate = useNavigate();
  const auth = useAuth();
  const [stories, setStories ] = useState( [] );
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilters, setCategoryFilters] = useState([]);
  

  const options = [
    { value: 'Action', label: 'Action' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Horror', label: 'Horror' },
    { value: 'Love', label: 'Love' },
    { value: 'Mystery', label: 'Mystery' },
    { value: 'Other', label: 'Other' }
  ]

  useEffect(() => {
  requestData();
  }, []);

  const requestData = async () => {
    try {
        const { data } = await axios("users/favourites", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        } );
        
        setStories( data );

    } catch (error) {
      console.log(error);
    }
  };
  

  const handlePlay = async (id, first) => {
    navigate(`/story/${id}/${first}`)
  };

  const handleMultiChange = (selectedOptions) => {
    setCategoryFilters((state) => selectedOptions.map(selectedOption => selectedOption.value));
  };

  const hasCategoryFilter = (story) => {
    return !categoryFilters.length || categoryFilters.includes(story.category);
  };

  const hasSearchFilter = (story) => {
    return searchQuery === "" || story.name.toLowerCase().includes(searchQuery.toLowerCase()) || story.description.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const handleDeleteFavourite = async (id) => {
    try {
      await axios.delete( `users/favourites/${ id }` )
      requestData();
      
    } catch ( err ) {
      console.log(err)
    }
  };
  

  return (
    <div class="flex">
      {/* SEARCH / FILTER SECTION */}
      <div class="flex w-1/5 bg-grayCustom i justify-around items-top">
        <div className="mt-20">
          <p className="tracking-wide text-md text-purple-600 font-semibold uppercase">Search and filter</p>
          {(isProfile)
          ?<p className="tracking-wide text-md text-purple-600 font-semibold uppercase">your favourites</p>
          :""}
          <div className="mt-7">
            <p className="mb-2 text-gray-700">Search for</p>
            <input className="border-2 border-gray-200 pr-10 pl-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mb-5" name="searchWord" placeholder = "title, description..." onChange={(event) => setSearchQuery(event.target.value)} />
          </div>
          
          <div>
            <p className="mb-2 text-gray-700"> Category filter</p>
            <div className="rounded pr-30">
              <Select
              placeholder= 'Select category' 
              options={options} 
              isMulti 
              onChange={(selectedOptions) => handleMultiChange(selectedOptions)}
              theme={(theme) => ({
                ...theme,
                borderRadius: 2,
                colors: {
                  ...theme.colors,
                  primary: '#7C3AED',
                  primary25: '#EDE9FE',
                }
              })}
              />
            </div>
          </div>
        </div>
      </div>

      <div class="w-4/5 bg-grayCustom1 justify-top">
        <p className="text-3xl font-bold text-gray-700 flex justify-start items-top m-20">Your favourite <i>WhatNext</i>:</p>
        <div className="flex justify-center items-center"> 
          <div className="flex justify-center items-center grid grid-cols-4 gap-10"> 
              {stories && stories.filter((story) => {
              if (hasSearchFilter(story) && hasCategoryFilter(story)) return story}).map((story) => (        
              <Card 
                story={story} 
                isProfile={!isProfile}
                handlePlay={() => handlePlay(story.id, story.first)}
              />
            ))} 
          </div> 
        </div>  
      </div>
</div>
  )
}
