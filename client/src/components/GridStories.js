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
    <div>
      HELLO I AM THE GRID OF STORIES
      {stories.map((story) => (
        <article className="bg-gray-100 border-solid border-4 border-light-blue-500">
          <div>
            <p>{story.name}</p>
            <p>{story.description}</p>
            {/* <p>{story.category}</p> */}
          </div>
        </article>
      ))}
    </div>
  );
}
