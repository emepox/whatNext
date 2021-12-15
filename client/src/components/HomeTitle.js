import React from 'react';
import "./Login.css";

import Bestpickle from "../img/Bestpickle.png";
import Citric from "../img/Citric.png";
import Beetjuice from "../img/Beetjuice.png";


export default function App({scroll}) {

  return (
    
    <div className="flex flex-col items-center justify-center">
      <div className="px-12 mx-auto max-w-7xl">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 className="mt-96 mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
                <span>Start a</span> <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">WhatNext</span> <span>and create infinite possibilities 🚀</span>
            </h1>
            <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
            WhatNext is a platform that lets you choose your own adventure: <br/>create or play stories like in the 80s books, but cooler.
            </p>
            <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                <a href="/start" className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 rounded-2xl sm:w-auto sm:mb-0">
                    Get Started
                    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
                <button onClick={scroll} className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-2xl sm:w-auto sm:mb-0">
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                </button>
            </div>
        </div>
      </div>

        <section>
            <div className="container max-w-full mx-auto py-24 px-10">
              <div className="max-w-full md:max-w-6xl mx-auto my-3 md:px-8">
                <div className="relative block flex flex-col md:flex-row items-center">
                  
                  {/* CARD HORROR */}
                  <div className="w-11/12 max-w-sm sm:w-3/5 lg:w-72 sm:my-5 my-8 relative rounded-lg shadow-lg md:-mr-4">
                    <div className="bg-white text-black rounded-lg shadow-inner shadow-lg overflow-hidden">
                      <div className="block text-left text-sm sm:text-md text-black">
                        <img
                          className="object-cover h-48 w-screen"
                          src={Bestpickle}
                          alt="whatever"
                        />
                        <div className="m-5">
                          <div className="uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3">
                            Horror
                          </div>
                          <a
                            href="/play"
                            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline mt-3"
                          >
                            Boar tries pickles
                          </a>
                          <p className="mt-2 text-gray-500 mr-2">
                            Join the boar in this new adventure visiting
                            Barcelona. What will happen? Only you can tell
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CARD MOST POPULAR */}
                  <div className="w-full max-w-md sm:w-2/3 lg:w-80 sm:my-5 my-8 relative bg-white rounded-lg shadow-lg">
                    <div className="text-sm leading-none rounded-t-lg bg-gray-200 text-black font-semibold uppercase py-4 text-center tracking-wide">
                      Play Most Popular
                    </div>
                    <div className="block text-left text-sm sm:text-md  text-black">
                      <img
                        className="object-cover h-48 w-screen"
                        src={Beetjuice}
                        alt="whatever"
                      />
                      <div className="m-5">
                        <div className="uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3">
                          Drama
                        </div>
                        <a
                          href="/play"
                          className="block mt-1 text-lg leading-tight font-medium text-black hover:underline mt-3"
                        >
                          Boar tries pickles
                        </a>
                        <p className="mt-2 text-gray-500 mr-2 mb-10">
                          Join the boar in this new adventure visiting
                          Barcelona. What will happen? Only you can tell
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CARD COMEDY */}
                  <div className="w-11/12 max-w-sm sm:w-3/5 lg:w-72 sm:my-5 my-8 relative rounded-r-lg shadow-lg md:-mr-4">
                    <div className="bg-white text-black rounded-r-lg shadow-inner shadow-lg overflow-hidden">
                      <div className="block text-left text-sm sm:text-md text-black">
                        <img
                          className="object-cover h-48 w-screen"
                          src={Citric}
                          alt="whatever"
                        />
                        <div className="m-5">
                          <div className="uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3">
                            Comedy
                          </div>
                          <a
                            href="/play"
                            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline mt-3"
                          >
                            Boar tries pickles
                          </a>
                          <p className="mt-2 text-gray-500 mr-2">
                            Join the boar in this new adventure visiting
                            Barcelona. What will happen? Only you can tell
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* HERE IT ENDS  */}
                </div>
              </div>
            </div>
          </section>


    </div>
    
  )
}
