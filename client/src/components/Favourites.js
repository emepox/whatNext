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

  const handleDeleteFavourite = async (id) => {
    try {
      await axios.delete( `users/favourites/${ id }` )
      requestData();
      
    } catch ( err ) {
      console.log(err)
    }
  };
  

  return (
    <div class="h-screen flex">
      {/* SEARCH / FILTER SECTION */}
        <div class="flex w-1/5 bg-grayCustom i justify-around items-top">
        <div className="mt-20">
        </div> 
      </div>

      <div class="w-4/5 bg-grayCustom1 justify-center">
        <p className="text-3xl font-bold text-gray-700 flex justify-start items-top m-20">Your favourite <i>WhatNext</i>:</p>
        <div className="flex justify-center items-center"> 
          <div className="flex justify-center items-center grid grid-cols-4 gap-10"> 
              {stories && stories.map((story) => (        
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
