import React from 'react'
import Beetjuice from '../img/Beetjuice.png'
import Bestpickle from '../img/Bestpickle.png'
import Citric from '../img/Citric.png'
import Hot from '../img/Hot.png'

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-white to-grayBg via-grayVia h-screen">
       
      {/* <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-3"> */}
      <div className="md:container md:mx-auto">
      <div className="my-3 grid justify-items-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      
      
        <div className="my-5">
          <div className="w-72 h-96 max-w-md mx-auto bg-white rounded-xl shadow-md opacity-80 overflow-hidden md:max-w-2xl hover:shadow-lg hover:opacity-100 transform hover:scale-105 transition duration-400">
            <div className="md:flex">
              <div className="md:flex-initial">
                <img className="object-cover h-48 w-screen" src={Hot} alt="whatever" />
                <div className='uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3 ml-2'>
                  Adventure
                  </div>
                  <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline ml-2 mt-3">Boar visits the city</a>
                  <p className="mt-2 text-gray-500 ml-2 mr-2">Join the boar in this new adventure visiting Barcelona. What will happen? Only you can tell</p>
                </div>
            </div>
          </div>
        </div>

        <div className="my-5">
          <div className="w-72 h-96 max-w-md mx-auto bg-white rounded-xl shadow-md opacity-80 overflow-hidden md:max-w-2xl hover:shadow-lg hover:opacity-100 transform hover:scale-105 transition duration-400">
            <div className="md:flex">
              <div className="md:flex-initial">
                <img className="object-cover h-48 w-screen" src={Bestpickle} alt="whatever" />
                <div className='uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3 ml-2'>
                  Horror
                  </div>
                  <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline ml-2 mt-3">Boar tries pickles</a>
                  <p className="mt-2 text-gray-500 ml-2 mr-2">Join the boar in this new adventure visiting Barcelona. What will happen? Only you can tell</p>
                </div>
            </div>
          </div>
        </div>

      
        <div className="my-5">
          <div className="w-72 h-96 max-w-md mx-auto bg-white rounded-xl shadow-md opacity-80 overflow-hidden md:max-w-2xl hover:shadow-lg hover:opacity-100 transform hover:scale-105 transition duration-400">
            <div className="md:flex">
              <div className="md:flex-initial">
                <img className="object-cover h-48 w-screen" src={Citric} alt="whatever" />
                <div className='uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3 ml-2'>
                  Love
                  </div>
                  <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline ml-2 mt-3">Boar falls in love</a>
                  <p className="mt-2 text-gray-500 ml-2 mr-2">Join the boar in this new adventure visiting Barcelona. What will happen? Only you can tell</p>
                </div>
            </div>
          </div>
        </div>

        <div className="my-5">
          <div className="w-72 h-96 max-w-md mx-auto bg-white rounded-xl shadow-md opacity-80 overflow-hidden md:max-w-2xl hover:shadow-lg hover:opacity-100 transform hover:scale-105 transition duration-400">
            <div className="md:flex">
              <div className="md:flex-initial">
                <img className="object-cover h-48 w-screen" src={Beetjuice} alt="whatever" />
                <div className='uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3 ml-2'>
                  Drama
                  </div>
                  <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline ml-2 mt-3">Boar doesn't get beets</a>
                  <p className="mt-2 text-gray-500 ml-2 mr-2">Join the boar in this new adventure visiting Barcelona. What will happen? Only you can tell</p>
                </div>
            </div>
          </div>
        </div>

     
        </div>
      
      </div>
    </div>
  )
}
