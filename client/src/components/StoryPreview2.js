import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from 'react-rating';


import Beetjuice from '../img/Beetjuice.png'
import Bestpickle from '../img/Bestpickle.png'
import Citric from '../img/Citric.png'
import Hot from '../img/Hot.png'


const axios = require("axios");

export default function StoryPreview2() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [story, setStory] = useState(null);
  
  useEffect(() => getStory(id), []);

  const getStory = async (id) => {
    try {
      const { data } = await axios.get(`/stories/${id}/`);
      setStory(data);
    } catch (error) {
      console.log(error);    
    }
  };

  const handlePlay = async (id, first) => {
    console.log(id, first)
    navigate(`/story/preview/${id}`)
  };

  //TODO: MAKE THIS WORK
  const handleEdit = (id) => {
    console.log(`Click edit ${id}`)
  }

  return (
    <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-4 xxl:col-span-4 px-6 py-6">
    <p className="text-purple-500 font-semibold uppercase mt-10 mb-10">STORY DETAILS</p>
      <div className="bg-white rounded-xl p-4 shadow-xl ">
        <div className="flex flex-col justify-center items-center">
          <div className="w-32 h-32 rounded-full bg-gray-300 border-2 border-white mt-2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVxhAxJ4D7MOeTTj6kR9PBeZonW5HM7giKjTbEmR-HMBwf3G1VqGnlwpO1kWrdyIZu8_U&usqp=CAU"
              className="rounded-full w-auto"
            />
          </div>
          <p className="font-semibold text-xl mt-1">Title</p>
          <p className="font-semibold text-base text-gray-400">category</p>

          <div className="relative p-4 rounded-lg shadow-xl w-full bg-cover bg-center h-32 mt-4">
            <div className="absolute inset-0 bg-gray-400 bg-opacity-50"></div>
            <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">
              <div>
                <h3 className="text-center text-white text-xl font-bold">What is it about?</h3>
                <h3 className="text-center text-white  mt-2 ">
                  cat ipsum. Meow meow
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div className="bg-white p-3 rounded-xl shadow-xl flex items-center justify-between mt-4">
        <div className="flex space-x-6 items-center">
          <img
            src="https://i.pinimg.com/originals/25/0c/a0/250ca0295215879bd0d53e3a58fa1289.png"
            className="w-auto h-24 rounded-lg"
          />
          <div>
            <p className="font-semibold text-base">Created by</p>
            <p className="font-semibold text-sm text-gray-400">
              username
            </p>
          </div>
        </div>
      </div>
 
      <div className="bg-white rounded-xl p-4 shadow-xl mt-4">
        <div className="flex flex-col justify-center items-center">
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/upload-social-media-post-4291893-3569926.png"
            className="w-auto h-40 rounded-lg"
          />
          <p className="font-semibold text-xl mt-1">Rating</p>
          <p className="font-semibold text-sm text-gray-400 text-center">
            cat ipsum. meow meow
          </p>
          <div className="mt-5"><Rating /></div>
        </div>
      </div>
    </div>
  )
}
