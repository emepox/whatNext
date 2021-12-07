import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from 'react-rating';

const axios = require("axios");

export default function StoryPreview() {
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
    navigate(`/story/${id}/${first}`)
  };


  return (

    <div className="flex flex-col items-center justify-center">
        {story &&  (
          <div className="">
            {/* <div>{image && <img src={image} />}</div> */}
            <div className="text-3xl text-white font-mono italic flex flex-col items-center justify-center mb-3">
              {story.name}
            </div>
            <div className="text-m text-white font-mono italic flex flex-col items-center justify-center mb-3">
              by {story.User.username}
            </div>
            <hr/>
            <Rating/>
            <button onClick={() => handlePlay(story.id, story.first) } className="bg-purple-400 text-white p-1 rounded m-2 hover:bg-purple-500 hover:shadow-lg">Play</button>
          </div>
        )}   
    </div>
  );
}
