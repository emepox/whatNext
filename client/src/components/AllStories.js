import React from "react";
import GridStories from "./GridStories";
  
export default function AllStories(isProfile) {

  return (
      <div>
        {/* <p className="text-2xl text-white font-mono italic mb-10 ">Select a Story</p> */}
        <GridStories isProfile={false} isFavourite={false}/>
      </div>
  );
}
