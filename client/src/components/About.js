import React from "react";

export default function About() {
  return (
    <div>
      <section>
        <div className="container max-w-full mx-auto py-24 px-6">
          <h1 className="text-center text-4xl text-white font-medium leading-snug tracking-wider">
            About
          </h1>
          <div className="h-1 mx-auto bg-indigo-200 w-24 opacity-75 mt-4 rounded mb-5"></div>
          <p className="text-center text-lg text-white mt-2 px-6">
            This is a students project that was created at <a href="http://codeop.tech" className="text-indigo-400">Codeop</a>, a full stack development bootcamp in Barcelona.
          </p>
          
        </div>
      </section>
    </div>
  );
}
