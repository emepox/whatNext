import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Rating from "react-rating";
import Card from "./Card";
import axios from "axios";

export default function StoryEnd() {

    const [ story, setStory ] = useState( {} );
    const [ rating, setRating ] = useState( {} );
    const [toggle, setToggle] = useState(true)
    const [user, setUser] = useState("");

    const { id } = useParams();
    const auth = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        requestStory();
        requestUser();
        console.log(user)
    }, []);

    const requestStory = async () => {
        try {
            const { data } = await axios.get( `/stories/${id}/` );
            setStory( data )
            
        } catch ( err ) {
            console.log(err)
        }
    }

    const requestUser = async () => {
      try {
        const { data } = await axios("/users/dashboard/", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

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

            setToggle(!toggle)
            
        } catch ( err ) {
            console.log(err)
        }

    }

    const handlePlay = async (id, first) => {
      navigate(`/story/${id}/${first}`);
    };
    
    // add or remove story from favourites
  // const handleSingleFavourite = async () => {
  //   if (!(story.Favouritee && story.Favouritee.some(fav => fav.id === user) || story.Favourites)){ 
  //   try {
  //     await axios('/users/favourites/', {
  //       method: "POST",
  //       headers: {
  //           authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //       data: {storyId: +story.id},
  //     });
  //     requestStory();
  //   } catch (err) {
  //     console.log(err);
  //   }
  //  } else {
  //     try {
  //       await axios(`/users/favourites/${story.id}`, {
  //         method: "DELETE",
  //         headers: {
  //             authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       });
  //     requestStory();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //  }
  // };


    return (
      <div className="flex flex-col items-center justify-center bg-grayCustom2 h-screen">
        <p className="justify-center text-center text-2xl font-bold text-gray-900">Your opinion matters!</p>
        <p className="text-center text-lg text-gray-900 mb-10">How was the game?</p>
        {Object.keys(story).length && <Card toggle={toggle} user={user.id} story={story} handlePlay={() => handlePlay(story.id, story.first)}  onFavourited={requestStory}/>}

        {/* CONTENEDOR DE RATINGS */}
        <div className="w-72 flex flex-col justify-center md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs mx-auto border border-white bg-white mt-5">
          {auth.isLoggedIn ? (
            <form
              className="flex flex-col justify-center content-center"
              onSubmit={(e) => handleSubmit(e)}
            >
              <p className="text-center font-semibold text-gray-800 mb-2">Rate this story</p>

              <Rating
                emptySymbol={
                  <span className="material-icons text-yellow-500">star_border</span>
                }
                fullSymbol={
                  <span className="material-icons text-yellow-500">grade</span>
                }
                onClick={(displayValue) => handleRating(displayValue)}
                value={rating}
              />
              <button className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white py-1 mt-3">Send</button>
            </form>
          ) : (
            <div className="text-center"><p>You need to be logged in to rate this story.</p><button><a href="/login">Log in</a></button></div>
          )}
        </div>
      </div>
    );
}





