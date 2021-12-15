import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";

export default function Card({
  story,
  view,
  handleEdit,
  handleDelete,
  handlePlay,
  onFavourited,
  user,
  toggle
} ) {
  
  const auth = useAuth();
  const [ rating, setRating ] = useState( {} );

  useEffect(() => {
    requestRating();
  }, [toggle] );
  

  const requestRating = async () => {
     try {
       const { data } = await axios.get(`/api/stories/${story.id}/rating`);
       setRating( data );
     } catch (err) {
       console.log(err);
     }
  }

  // add or remove story from favourites
  const handleFavourite = async (view) => {
    if (!(story.Favouritee && story.Favouritee.some(fav => fav.id === user) || story.Favourites)){ 
    try {
      await axios('/api/users/favourites/', {
        method: "POST",
        headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {storyId: +story.id},
      });
      onFavourited(view);
    } catch (err) {
      console.log(err);
    }
   } else {
      try {
        await axios(`/api/users/favourites/${story.id}`, {
          method: "DELETE",
          headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        onFavourited(view);
      } catch (err) {
        console.log(err);
      }
   }
  };

  

  return (
    <div
      
      className="h-96 max-w-md bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-lg transform hover:scale-105 transition duration-400"
    >
      <div className="md:flex">
        <div className="md:flex-initial">
          <img
            className="object-cover h-48 w-screen"
            src={story.media}
            alt="Game"
          />

          {/* button with options above img */}
          <div className="absolute top-0 right-0 text-white p-2 m-2">
            <div className="">
              <div className="relative inline-block text-left dropdown">
                {!(view==="profile") && (
                  <span className="rounded-md shadow-sm">
                    <button
                      onClick={handlePlay}
                      className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-gray-300 opacity-100 hover:bg-purple-400 shadow-md rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 rounded-full"
                      type="button"
                      aria-haspopup="true"
                      aria-expanded="true"
                      aria-controls="headlessui-menu-items-117"
                    >
                      <span className="fontAwesome text-white">&#xf144;</span>
                    </button>
                  </span>
                )}
              </div>

              {(view==="profile") && (
                <div className="relative inline-block text-left dropdown">
                  <span className="rounded-md shadow-sm">
                    <button
                      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-gray-100 shadow-md rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 rounded-full"
                      type="button"
                      aria-haspopup="true"
                      aria-expanded="true"
                      aria-controls="headlessui-menu-items-117"
                    >
                      <span className="fontAwesome">&#xf142;</span>
                    </button>
                  </span>
                  <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                    <div
                      className="absolute right-0 w-56 mt-2 origin-top-right bg-white  border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                      aria-labelledby="headlessui-menu-button-1"
                      id="headlessui-menu-items-117"
                      role="menu"
                    >
                      <div className="py-1">
                        <button
                          onClick={handleEdit}
                          tabIndex="0"
                          className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                          role="menuitem"
                        >
                          Edit 
                        </button>
                        <button
                          onClick={handleDelete}
                          tabIndex="1"
                          className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                        >
                          Delete 
                        </button>
                        <button
                          onClick={handlePlay}
                          tabIndex="2"
                          className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                          role="menuitem"
                        >
                          Play
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        {/* REVIEWS AND LIKE */}
        <div className="my-2 ml-5 mr-5 flex justify-between">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <p className="text-gray-600 font-bold text-sm ml-1">
              <span className="mr-2">{rating.average}</span>
              <span className="text-gray-500 font-normal">
                ({rating.amount} reviews)
              </span>
            </p>
          </div>
          {/* && Object.keys(user).length */}
          {auth.isLoggedIn && (
            <button
              className={
                ((story.Favouritee && story.Favouritee.length && story.Favouritee.some((fav) => fav.id === user)) || story.Favourites ) 
                ? "fontAwesome text-red-400" 
                : "fontAwesome text-gray-200 hover:text-red-300"}
              onClick={() => handleFavourite(view)}
            >
              &#xf004;
            </button>
          )}
        </div>

        {/* CARD INFO */}
        <div onClick={handlePlay} className="ml-5 mr-5 cursor-pointer">
          <div className="uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-5">
            <p>{story.category} </p>
          </div>

          {/* <a
          href="#"
          className="block text-lg leading-tight font-medium text-black hover:underline mt-2"
        > */}
          <p>{story.name}</p>
          {/* <p className="font-small text-sm text-gray-300 mt-3">
            by: {story.User && story.User.username}
          </p> */}
          {/* </a> */}
          <p className="mt-3 text-gray-500 mr-2">
            {(story && story.description.length >= 85)
              ? `${story.description.slice(0, 85)}...`
              : story.description}
          </p>
        </div>
      </div>

    </div>
  );
}
