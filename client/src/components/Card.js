import React from 'react';

export default function Card({story, isProfile, handleEdit, handleDelete, handlePlay}) {
  return (
<div>
      <div key={ story.id } className="w-72 h-96 max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:max-w-2xl hover:shadow-lg transform hover:scale-105 transition duration-400">
        
        <div className="md:flex">
          <div className="md:flex-initial">
            <img className="object-cover h-48 w-screen" src={story.media} alt="Game's image" />
            {/* button with options above img */}
            <div className="absolute top-0 right-0 text-white p-2 m-2">
              <div className="">
                {!isProfile && (
                  <div className="relative inline-block text-left dropdown">
                    <span className="rounded-md shadow-sm">
                    <button onClick={handlePlay} className="inline-flex justify-center w-full px-3 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-purple-500 shadow-md rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 rounded-full" 
                    type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                    <span className="fontAwesome text-white">
                      &#xf144;
                    </span>
                    </button>
                  </span>
                  </div> 
                )}
                {isProfile && (
                  <div className="relative inline-block text-left dropdown">
                    <span className="rounded-md shadow-sm">
                    <button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-gray-100 shadow-md rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 rounded-full" 
                    type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                    <span className="fontAwesome">
                      &#xf142;
                    </span>
                    </button>
                  </span>
                  <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">                    
                  <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white  border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                    <div className="py-1">
                      <button onClick={handleEdit} tabindex="0" className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" >Edit story</button>
                      <button onClick={handleDelete} tabindex="1" className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" >Delete story</button>
                      <button onClick={handlePlay} tabindex="2" className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" role="menuitem" >Play</button>
                    </div>
                  </div>  
                  </div> 
                  </div> 
                )}
              </div>              
            </div>

                <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                  <div
                    className="absolute right-0 w-56 mt-2 origin-top-right bg-white  border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                    aria-labelledby="headlessui-menu-button-1"
                    id="headlessui-menu-items-117"
                    role="menu"
                  >
                    {isProfile && (
                      <div className="py-1">
                        <button
                          onClick={handleEdit}
                          tabIndex="0"
                          className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                          role="menuitem"
                        >
                          Edit story
                        </button>
                        <button
                          onClick={handleDelete}
                          tabIndex="1"
                          className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                        >
                          Delete story
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
                    )}
                  </div>
                </div>
              </div>
            </div>
      </div>

          <div className="ml-5 mr-5">
            <div className="uppercase tracking-wide text-sm font-semibold text-indigo-500 mt-3 ">
              <p>{story.category}</p>
            </div>

            <a
              href="#"
              className="block text-lg leading-tight font-medium text-black hover:underline mt-6"
            >
              <p>{story.name}</p>
            </a>
            <p className="mt-3 text-gray-500 mr-2">
              {story.description.length >= 91
                ? `${story.description.slice(0, 90)}...`
                : story.description}
            </p>
          </div>
    
          {/*             
            {!isProfile && (
              <div className="flex justify-center">
                <button onClick={() => handlePreview(story.id) } className="bg-purple-400 text-white p-1 rounded m-2 hover:bg-purple-500 hover:shadow-lg">Play</button>
              </div>
            )} */}

        </div>
  
      
  );
}
