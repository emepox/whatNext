import {React, useState, useRef} from 'react'
import CreateStory from './CreateStory';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { useNavigate } from "react-router-dom";
import Noty from 'noty';
import "../../node_modules/noty/lib/themes/sunset.css";
import "../../node_modules/noty/lib/noty.css";
import Texts from "../img/Texts.png";

const axios = require('axios');

const url = (name, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

export default function StoryDetails() {
    const parallax = useRef(null);
    const navigate = useNavigate();
    
    const categories = ["Action", "Comedy", "Drama", "Horror", "Love", "Mystery", "Other"];

    const [newStory, setNewStory] = useState({
        name: "",
        description: "",
        media: "",
        category: "",
        isPrivate: 0,
        isFinished: 0,
    })

    const [postedStory, setPostedStory] = useState({
        id:null,
        name:null,
        description:null,
        first:null
    });

    
    // changes newGame values for inputs
    const handleChange = (event) => {
        const { value, name } = event.target;
        setNewStory((state) => ({ ...state, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createStory();
        parallax.current.scrollTo(1);
    };

    // creates new story in DB
    async function createStory() {
      
        try {
        const { data } = await axios('/stories', {
            method: "POST",
            headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
            },
            data: newStory,

        });
        setPostedStory(data)
        new Noty({
            theme: 'sunset',
            type: 'success',
            layout: 'topRight',
            text: "New WhatNext template generated. It's time to fill it in! ⚡️",
            timeout: 2000,
            callbacks: {
            afterClose: function () {
                navigate(`/start`, { state: { id:data.id, name:data.name }});
            }}
          }).show();
        } catch (error) {
        console.error(error);
        new Noty({
            theme: 'sunset',
            type: 'error',
            layout: 'topRight',
            text: "Ouch! Something went wrong 😑... Try again!",
            timeout: 2000
          }).show();
      }
    }

    


    return (
        <div>
            <Parallax ref={parallax} pages={2}>
                <ParallaxLayer
                    // className="bg-gradient-to-br from-pink-50 to-indigo-100"
                    offset={0}
                    speed={0}
                    factor={3}
                    style={{
                        backgroundColor: '#f6f6f9'
                    }}
                    />

                <ParallaxLayer 
                    offset={0}
                    speed={2.5}
                    style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'center',
                    
                    }}>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center mt-20">
                            <img src={Texts} className="w-5/12"/>
                            <p className="text-3xl font-bold text-gray-700 mt-5">A blank canvas for you</p>
                            <p className="text-lg text-gray-700 mb-20 mt-3">Every big idea starts with a WhatNext</p>
                        </div>
                        {!postedStory.id &&
                         <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-11 space-y-4 shadow-xl opacity-90">

                            <div><p className="font-medium self-center text-xl sm:text-3xl text-gray-800 flex flex-col items-center justify-center">New WhatNext</p></div>

                            {/* add a brief explanation about what to do */}
                            <div>
                                <input name="name" value={newStory.name} placeholder="Title" onChange={handleChange} className="border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent pr-inputcustom" required/>
                            </div>
                            <div>
                                <textarea name="description" rows="4" onChange={handleChange} placeholder="Add a brief summary" className="w-full border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><p className="text-gray-400">Category:</p></div> 
                                <div>
                                    <select name="category" value={newStory.category} onChange={handleChange} className="w-full border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required>
                                        <option value="">Choose a category</option>
                                        {categories.map(category => <option value={category}>{category}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div>
                            <input maxlength="255" name="media" value={newStory.media} placeholder="Add the URL of an image that illustrates your story" onChange={handleChange} className="border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent pr-inputcustom mb-4" required/>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                            <button className="bg-blue-500 px-3 py-2 text-white text-base uppercase tracking-wide rounded-full py-2 px-5 hover:bg-purple-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ">START WRITING!</button>
                            </div>
                        </form>
                        }
                        
                    </div>
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={2} style={{ backgroundColor: '#DCE0EB' }} />

                <ParallaxLayer
                    offset={1}
                    speed={0.5}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        
                    }}>

                    {postedStory.id && <CreateStory postedStory={postedStory}/>}

                </ParallaxLayer>
            </Parallax>
        </div>
    )
}
