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

  //TODO: MAKE THIS WORK
  const handleEdit = (id) => {
    console.log(`Click edit ${id}`)
  }

  return (

    <div className="flex flex-col items-center justify-center">
        {story &&  (
          <div className="">
            {/* <div>{image && <img src={image} />}</div> */}
            <div className="text-3xl text-white font-mono italic flex flex-col items-center justify-center mb-3">
              {story.name}
            </div>
            <hr/>
            <div className="flex flex-col items-center justify-center my-3">
            <img
                    className="object-cover"
                    src={story.media}
                    alt="Game's image"
                  />
            </div>
            <div className="text-m text-white font-mono flex flex-col items-start justify-start mb-3">
              Created by: <br/>
              {story.User.username}
            </div>
            <div className="text-m text-white font-mono flex flex-col items-start justify-start mb-3">
              What is it about? <br/>
              {story.description}
            </div>
            <div className="text-m text-white font-mono flex flex-col items-start justify-start mb-3">
              Rating:
            </div>
            <button onClick={() => handlePlay(story.id, story.first) } className="bg-purple-400 text-white py-3 px-5 rounded m-3 hover:bg-purple-500 hover:shadow-lg">Play</button>
          </div>
        )}   
    </div>
  );
}
