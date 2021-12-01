import {React, useState, useRef} from 'react'
import CreateStory from './CreateStory';
import "./CreateStory.css"
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

const axios = require('axios');

const url = (name, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

export default function StoryDetails() {
    const parallax = useRef(null);

    const [newStory, setNewStory] = useState({
        name: "",
        description: "",
        media: "",
        category: "",
        isPrivate: 0,
        isFinished: 0,
    })

    const [storyId, setStoryId] = useState();
    const [storyName, setStoryName] = useState();

    // changes newGame values for inputs
    const handleChange = (event) => {
        const { value, name } = event.target;
        setNewStory((state) => ({ ...state, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createStory();
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
        console.log(data)
        setStoryId(data.id)
        setStoryName(data.name)
        } catch (error) {
        console.error(error);
        }
    }

    return (
        <div>
            <Parallax ref={parallax} pages={1}>
                <ParallaxLayer
                    offset={0}
                    speed={0}
                    factor={3}
                    style={{
                    backgroundImage: url('stars', true),
                    backgroundSize: 'cover',
                    }}
                    />

                <ParallaxLayer 
                    offset={0}
                    speed={0.1}
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}>
                    <div className="flex flex-col items-center justify-center">
                        {!storyId &&
                        <form className="rounded-md bg-white p-11 space-y-4 shadow-lg opacity-90">
                            <div><p className="text-2xl font-mono italic">Story details</p></div>
                            <div>
                                <input name="name" value={newStory.name} placeholder="Title" onChange={handleChange} className="border-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent pr-12"/>
                            </div>
                            <div>
                                <textarea name="description" rows="4" cols="50" onChange={handleChange} placeholder="Add a brief summary" className="border-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"></textarea>
                            </div>
                            <div>
                                <p className="text-gray-500">Category:</p> 
                                <select name="category" value={newStory.category} onChange={handleChange}>
                                    <option value="">-Please choose an option-</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Horror">Horror</option>
                                    <option value="Love">Love</option>
                                    <option value="Mystery">Mystery</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                            <input name="media" value={newStory.media} placeholder="Add the URL of an image that illustrates your story" onChange={handleChange} className="border-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent pr-12 mb-4"/>
                            </div>
                            <button onClick={handleSubmit} className="bg-purple-500 px-3 py-2 text-white text-base uppercase tracking-wide rounded py-2 px-5 hover:bg-purple-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ">START WRITING!</button>
                        </form>
                        }
                        {storyId &&
                        <CreateStory storyId={storyId} storyName={storyName}/>
                        }
                    </div>
                </ParallaxLayer>
            </Parallax>
        </div>
    )
}
