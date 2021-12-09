import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Rating from "react-rating";


import axios from "axios";

export default function StoryEnd() {

    const [ story, setStory ] = useState( [] );
    const [ user, setUser ] = useState( {username: "", id: 0} );
    const [ rating, setRating ] = useState( "" );
    const [ generalRating, setGeneralRating ] = useState( 0 );
    const [reviews, setReviews] = useState(0);
    
    const { id } = useParams();
    
    useEffect(() => {
      requestStory();
    }, []);

    const requestStory = async () => {
        try {
            const { data } = await axios.get( `/stories/${id}/` );
            setStory( data )
            setUser( { username: data.User.username, id: data.User.id })

        } catch ( err ) {
            console.log(err)
        }
    }

    const handleRating = (displayValue) => {
        setRating( displayValue );
    }

    console.log(rating)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log( "HEEE" )
        try {
            await axios(`/stories/${id}review`, {
              method: "PUT",
              headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
              },
              data: {
                score: rating,
                // storyId: story.id,
              },
            });
            
        } catch ( err ) {
            console.log(err)
        }

    }
    

    return (
      <div>
        <div className="mb-4">
          <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
            <div className="w-full md:w-1/3 bg-white grid place-items-center">
              <img src={story.media} className="rounded-xl" />
            </div>
            <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
              <div className="flex justify-between item-center">
                <p className="text-gray-500 font-medium hidden md:block ">
                  {story.category}
                </p>
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
                    {/* TO BE DONE */}
                    4.96
                    <span className="text-gray-500 font-normal">
                      {/* TO BE DONE */}
                      (76 reviews)
                    </span>
                  </p>
                </div>
              </div>
              <h3 className="font-black text-gray-800 md:text-3xl text-xl ">
                {story.name}
              </h3>
              <p className="md:text-lg text-gray-500 text-base">
                {story.description}
              </p>
                <p className="text-gray-400">Created by: { user.username }</p>
            </div>
          </div>
        </div>
            <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
            <form className="flex" onSubmit={(e) => handleSubmit(e)}>
                <p>Rate this story:</p>
                <Rating
                    emptySymbol={
                    <span className="material-icons text-black">star_border</span>
                    }
                    fullSymbol={
                    <span className="material-icons text-black">grade</span>
                    }
                    onClick={ ( displayValue ) => handleRating( displayValue ) }
                        
                    // value={rating}
                />
                <button>Send</button>
          </form>
        </div>
      </div>
    );
}





