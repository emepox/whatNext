import React from "react";
import Videosample from "../img/Videosample.mp4";

export default function Videodisplay() {
  return (
    <div className="container flex flex-col items-center justify-center">
      
      <h1 className="text-center text-4xl text-gray-900 font-medium leading-snug">
        Create stories that users will play
      </h1>
      <div className="h-1 w-24 opacity-75 bg-indigo-500 rounded mb-10 mt-5"></div>
      <video className="w-11/12" loop={true} autoPlay="autoplay" muted>
        <source src={Videosample} type="video/mp4" />
      </video>
      
    </div>
  );
}
