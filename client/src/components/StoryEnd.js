import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

export default function StoryEnd() {

    const [ story, setStory ] = useState( [] );
    const { id } = useParams();
    console.log(story)
    
    useEffect(() => {
      requestStory();
    }, []);

    const requestStory = async () => {
        try {
            const { data } = await axios.get( `/stories/${id}/` );
            setStory(data)

        } catch ( err ) {
            console.log(err)
        }


    }   
    
    
    
    
    return (
      <div>
        <div>Hello this is the end of the story.</div>
        <div>{story.name}</div>
        <div>{story.description}</div>
      </div>
    );
}
