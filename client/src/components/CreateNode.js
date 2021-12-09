import React, {useState} from 'react'
import Noty from 'noty';
import "../../node_modules/noty/lib/themes/mint.css";
import "../../node_modules/noty/lib/noty.css";
const axios = require('axios');


export default function CreateNode({storyId, getNodes, nodeList}) {

    const [text, setText] = useState("");

      const handleChange = (event) => {
        setText(event.target.value);
      };

      // creates new node in DB
  async function createNode(event) {
      event.preventDefault()
    try {
      const {data} = await axios.post('/nodes', {
        situation: text,
        StoryId: storyId
      });

      if(!nodeList.length) await axios.put(`/stories/${storyId}/first`, {firstId:data.id});
      getNodes()
      new Noty({
        theme: 'mint',
        type: 'success',
        layout: 'topRight',
        text: "New scenario saved!",
        timeout: 2000,
      }).show();
    } catch (error) {
      console.error(error); 
      new Noty({
        theme: 'mint',
        type: 'error',
        layout: 'topRight',
        text: "Ouch! Something went wrong 😑... Try again!",
        timeout: 2000
      }).show();
    }
  }

    return (
        <div>
          <p className="text-xl text-gray-700 font-semibold mb-3"> CREATE A SCENARIO</p>
            <form onSubmit={createNode}>
                <p className="text-gray-700 mb-3">1️⃣ WHAT is happening? <i>Player will read this before making a choice</i></p>
                <textarea rows="4" onChange={handleChange} placeholder="Type in a scenario" className="w-full border-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required></textarea>
                <br/><br/>
                <p className="text-gray-700 mb-3"> 2️⃣ <i>Don't forget to save!</i></p>
                <button className="text-white bg-blue-400 py-2 px-3 rounded-full m-2 hover:bg-blue-500 hover:shadow-lg">SAVE SCENARIO</button>
            </form>
        </div>
    )
}
