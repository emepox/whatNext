import React, {useState, useEffect} from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Card from "./Card";
import CreateStory from "./CreateStory";


export default function GridStories({isProfile, user}) {

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
  console.log(user);
  }, []);

  const requestData = async () => {
    try {
      if ( isProfile ) {
        const { data } = await axios("users/profile/", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        } );
        
        console.log(data)
        setStories( data );
      } else {
        const { data } = await axios("/stories/");
        console.log(data)
        
        setStories(data);
      }
    } catch (error) {
      
      console.log(error);
    }
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

  const handlePlay = async (id, first) => {
    navigate(`/story/${id}/${first}`)
  };

  //TODO: MAKE THIS WORK
  const handleEdit = (id, name) => {
    navigate(`/create`, { state: { id, name }})
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete( `stories/${ id }` )
      requestData();
      
    } catch ( err ) {
      console.log(err)
    }
  };
  

  return (
    <div className="flex">
      {/* SEARCH / FILTER SECTION */}
      <div className={(isProfile) ? "flex w-1/5 bg-grayCustom i justify-around items-top" : "flex w-1/5 bg-grayCustom i justify-around items-top h-screen"}>
        
        <div className="mt-20">
          <p className="tracking-wide text-md text-purple-600 font-semibold uppercase">Search and filter</p>
          {(isProfile)
          ?<p className="tracking-wide text-md text-purple-600 font-semibold uppercase">your WhatNext</p>
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

      <div className="w-4/5 bg-grayCustom1 justify-center">
        {isProfile 
        ? <p className="text-3xl font-bold text-gray-700 flex justify-start items-top m-20">Hello {user && user}! Here are your <i>WhatNext</i>:</p>
        : <p className="text-3xl font-bold text-gray-700 flex justify-start items-top m-20">All WhatNext</p>
        }
        <div className="flex justify-center items-center"> 
          <div className="flex justify-center items-center grid-cols-4 gap-10"> 
            {stories && stories.filter((story) => {
              if (hasSearchFilter(story) && hasCategoryFilter(story)) return story}).map((story) => (        
              <Card 
                story={story} 
                isProfile={isProfile} 
                handleEdit={() => handleEdit(story.id, story.name)} 
                handleDelete={() => handleDelete(story.id)} 
                handlePlay={() => handlePlay(story.id, story.first)}
              />
            ))} 
          </div> 
        </div>  
      </div>
</div>
  )
}
