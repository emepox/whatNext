import React, {useState} from 'react'
const axios = require('axios');

export default function EditNode({getNodes, nodeList}) {
    const [editedNode, setEditedNode] = useState(null)

    const handleChoice = event => {
        setEditedNode(nodeList[event.target.value])
    }
    const handleChange = event =>{
        setEditedNode(state => ({...state, situation:event.target.value}))
    }
    const handleClick = async () =>{
        const {id, situation} = editedNode
        try {
            await axios(`/nodes/edit/${id}`, {
            method: 'PUT',
            data: {
                situation
            },
          });
          getNodes()
        } catch (error) {
          console.log(error);
        }
    }

    return (
        <div>
            <select name="start" onChange={handleChoice}>
                <option value="" selected disabled hidden>Choose Situation</option>
              {nodeList.map((node, i) => 
                  <option key={node.id} value={i} >{node.situation}</option>
              )}
              </select><br/>
              {
                  editedNode&& 
                  <div>
                  <textarea value={editedNode.situation} rows="4" cols="50" onChange={handleChange} placeholder="What action is taken? " className="border-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required></textarea><br/>
                  <button onClick={handleClick}>Submit Changes</button>
                  </div>
              }
        </div>
    )
}
