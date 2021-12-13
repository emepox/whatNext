import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Rating from "react-rating";
import Card from "./Card";

import axios from "axios";

export default function StoryEnd() {

    const [ story, setStory ] = useState( {} );
    const [ rating, setRating ] = useState( {} );
    const [user, setUser] = useState("");

    const { id } = useParams();
    const auth = useAuth();

    
    useEffect(() => {
        requestStory();
    }, []);

    const requestStory = async () => {
        try {
            const { data } = await axios.get( `/stories/${id}/` );
            setStory( data )
            // setUser( data.User.username)

        } catch ( err ) {
            console.log(err)
        }
    }

    const handleRating = (displayValue) => {
        setRating( displayValue );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios(`/stories/${id}/rating`, {
              method: "PUT",
              headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
              },
              data: {
                score: rating,
                storyId: story.id,
              },
            });
            
        } catch ( err ) {
            console.log(err)
        }

    }
    
    return (
      <div>
        {Object.keys(story).length && <Card story={story} />}

        {/* CONTENEDOR DE RATINGS */}
        <div className="w-72 flex flex-col justify-center md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs mx-auto border border-white bg-white mt-5">
          {auth.isLoggedIn ? (
            <form
              className="flex flex-col justify-center content-center"
              onSubmit={(e) => handleSubmit(e)}
            >
              <p className="text-center">Rate this story</p>

              <Rating
                emptySymbol={
                  <span className="material-icons text-black">star_border</span>
                }
                fullSymbol={
                  <span className="material-icons text-black">grade</span>
                }
                onClick={(displayValue) => handleRating(displayValue)}
                value={rating}
              />
              <button>Send</button>
            </form>
          ) : (
            <div className="text-center"><p>You need to be logged in to rate this story.</p><button><a href="/login">Log in</a></button></div>
          )}
        </div>
      </div>
    );
}





