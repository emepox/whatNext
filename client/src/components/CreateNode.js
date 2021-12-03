import React, {useState} from 'react'
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
    } catch (error) {
      console.error(error);
    }
  }

    return (
        <div>
            <form onSubmit={createNode}>
                <textarea rows="4" cols="50" onChange={handleChange} placeholder="What is the situation" className="border-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required></textarea>
                <button>save situation</button>
            </form>
        </div>
    )
}
