import {React, useState} from 'react'
import CreateGame from './CreateGame';
import "./CreateGame.css"

const axios = require('axios');

export default function GameDetails() {

    const [newGame, setNewGame] = useState({
        name: "",
        description: "",
        media: "",
        isPrivate: 0,
        isFinished: 0,
    })

    const [storyId, setStoryId] = useState()

    // changes newGame values for inputs
    const handleChange = (event) => {
        const { value, name } = event.target;
        setNewGame((state) => ({ ...state, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createGame();
    };

    // creates new story in DB
    async function createGame() {
        try {
        const { data } = await axios('/stories', {
            method: "POST",
            data: newGame,
        });
        console.log(data)
        setStoryId(data.id)
        } catch (error) {
        console.error(error);
        }
    }

    return (
        <div>
            <form>
                <input name="name" value={newGame.name} placeholder="Title" onChange={handleChange}/><br/>
                <textarea name="description" rows="4" cols="50" onChange={handleChange} placeholder="Add a brief summary"></textarea><br/>
                <input name="media" value={newGame.media} placeholder="Add the URL of an image that illustrates your story" onChange={handleChange}/><br/>
                <button onClick={handleSubmit} >START WRITING!</button>
            </form>
            <CreateGame storyId="storyId"/>
        </div>
    )
}
