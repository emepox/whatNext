import React, { useState } from "react";
import "./CreateGame.css"
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

    const [nodeTriangle, setNodeTriangle] = useState([])

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
      const resp = await axios.put(`/nodes/`, nodeTriangle);
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
            <div>
                <label>Choice 1</label><br/><textarea name="option" rows="1" cols="50" onChange={handleChange}></textarea><br/>
                <label>What next?</label><br/><textarea name="situation" rows="4" cols="50" onChange={handleChange}></textarea>
            <br/><br/>
            </div>
            <div>
                <button onClick={handleSubmit}>SAVE</button><br/><br/>
            </div>
        </div>
    )
}
