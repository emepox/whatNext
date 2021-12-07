import React, {useState, useEffect} from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";


export default function GridStories({isProfile}) {
  
  const auth = useAuth();
  const [stories, setStories] = useState([]);

  useEffect(() => {
  requestData();
  }, []);

  const requestData = async () => {
    console.log(isProfile)
    // const url = isProfile ? "users/profile/" : "/stories/";
    // console.log(url)

    try {

      if ( isProfile ) {
        const { data } = await axios("users/profile/", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        } );
        console.log(data)
        setStories(data);
      } else {
        const { data } = await axios("/stories/");
        console.log(data)
        setStories(data);
      }

      console.log("stories:", stories);


    } catch (error) {
      console.log(error);
    }
};

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <p className="text-2xl text-white font-mono italic mb-10 ">Your Stories</p> */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-7">  
        {stories.map((story) => (        
          // this is a card
          <div className="w-72 h-96 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl hover:shadow-lg transform hover:scale-105 transition duration-400">
            <div className="md:flex">
              <div className="md:flex-initial">
                <img className="object-cover h-48 w-screen" src={story.media} alt="Game's image" />
                <div className='uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3 ml-2'>
                  <p>{story.category}</p>
                </div>
                <a href="#" className="block text-lg leading-tight font-medium text-black hover:underline ml-2 mt-6"><p>{story.name}</p></a>
                <p className="mt-3 text-gray-500 ml-2 mr-2"><p>{story.description}</p></p>
              </div>
            </div>
          </div>
        ))} 
      </div>   
    </div>
   
  )
}