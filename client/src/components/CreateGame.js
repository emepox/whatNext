import React, { useState } from "react";
import "./CreateGame.css"
import SelectNode from "./SelectNode";
import NewNode from "./NewNode";

const axios = require('axios');

export default function Creator() {  
    // const {situation, media, StoryId, option} = object;
    // new node to be posted to DB
    const [newNode, setNewNode] = useState({
      situation: "null",
      media: "",
      storyId: "",
      option: "",
    });

    const [nodeExists, setNodeExists] = useState(false)

    // changes newItem values for inputs
    const handleButton = () => {
      setNodeExists((state) => (!state));
      };

    // changes newItem values for inputs
    const handleChange = (event) => {
    const { value, name } = event.target;
    setNewNode((state) => ({ ...state, [name]: value }));
    };

    // on submit, calls addNode
    const handleSubmit = (event) => {
    event.preventDefault();
    addNode();
  };

    // creates query and posts new item to DB. 
    const addNode = async () => {
    try {
      const resp = await axios.put(`/nodes/`, {});
      const result = await resp.data;

    //   new Noty({
    //     theme: 'metroui',
    //     type: 'success',
    //     layout: 'center',
    //     text: 'Added!',
    //     timeout: 1000,
    //     callbacks: {
    //       afterClose: function () {
    //         window.location.href = "/closet";
    //       }
    //     }
    //   }).show();

    } catch (error) {
      console.log(error);
    //   new Noty({
    //     theme: 'metroui',
    //     type: 'error',
    //     layout: 'center',
    //     text: 'Ouch! Something went wrong. Try again!',
    //     timeout: 1000
    //   }).show();
    }
  };


    return (
        <div>
            <h3>"Jabalí unchained"</h3><br/>
            <form>
            <div>
                WHAT? (parent node) <br/>Jabalí gets into a bar
            </div>
            <br/>
            <div>
                <button onClick={handleButton}>SELECT CHOICE</button>-----
                <button onClick={handleButton}>CREATE NEW CHOICE</button>
            </div>
            </form>
            <br/><br/>
            <div>
                <label>Choice 1</label><br/><textarea name="option" rows="1" cols="50" onChange={handleChange}></textarea><br/>
            </div>
            {!nodeExists && <div><label>What next?</label><br/><textarea name="situation" rows="4" cols="50" onChange={handleChange}></textarea><br/></div>}
            {nodeExists && 
            <div>
                <label for="nodes">What next?</label>
                <select name="nodes" id="nodes">
                    <option value="rich">Jabalí becomes rich</option>
                    <option value="dead">Jabalí dies</option>
                    <option value="married">Jabalí gets married</option>
                </select>
            </div>}
            <br/>
            <br/><br/>
            <div>
                <button onClick={handleSubmit}>SAVE</button><br/><br/>
                <button onClick={handleSubmit}>CREATE/SELECT ANOTHER CHOICE</button>----
                <button onClick={handleSubmit}>CONTINUE STORYLINE</button>
                <br/><br/>
                <button onClick={handleSubmit}>FINISH STORY</button>
            </div>

        </div>
    )
}
