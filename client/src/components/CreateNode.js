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
            <form onSubmit={createNode}>
                <textarea rows="4" cols="50" onChange={handleChange} placeholder="What is the situation" className="border-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required></textarea><br/>
                <button>save situation</button>
            </form>
        </div>
    )
}
