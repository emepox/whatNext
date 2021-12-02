import {React, useState} from 'react'
import CreateStory from './CreateStory';
import "./CreateStory.css"

const axios = require('axios');

export default function StoryDetails() {

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
        setPostedStory(data)
        } catch (error) {
        console.error(error);
        }
    }


    return (
        <div>
            {!postedStory.id 
            ? <form>
                <input name="name" value={newStory.name} placeholder="Title" onChange={handleChange}/><br/>
                <textarea name="description" rows="4" cols="50" onChange={handleChange} placeholder="Add a brief summary"></textarea><br/>
                Category: 
                <select name="category" value={newStory.category} onChange={handleChange}>
                    <option value="">--Please choose an option--</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                    <option value="Horror">Horror</option>
                    <option value="Love">Love</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Other">Other</option>
                </select><br/>
                <input name="media" value={newStory.media} placeholder="Add the URL of an image that illustrates your story" onChange={handleChange}/><br/>
                <button onClick={handleSubmit} >START WRITING!</button>
            </form>
            :<CreateStory postedStory={postedStory}/>
            }
        </div>
    )
}
