import React, {useState} from "react";
const axios = require('axios');

export default function AddEdge({nodeList}) {

    const [newEdge, setNewEdge]= useState({
        start:null,
        next:null,
        option: ""
    })
    const [error, setError] = useState("")

    const handleChange = (event) => {
        const {name, value} = event.target
        setNewEdge((state => ({...state, [name]:value})))
    }
  async function addEdges() {
      const {start, next, option} = newEdge
      
    try {
        if(start===next) throw new Error("A scenario can't connect to itself; please select or create a different scenario!")
        if(!start||!next) throw new Error("Please select a node")
        await axios(`/nodes/${start}/edges`, {
        method: 'PUT',
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
            nextId:next,
            option
        },
      });
    } catch (error) {
      setError(error.message)
    }
  }

const handleSubmit = (event) => {
    event.preventDefault();
    addEdges();
    setNewEdge(state => ({...state, option:""}))
  };


  return <div>
      <form onSubmit={handleSubmit}>
          <label></label>
          <select name="start" onChange={handleChange} required>
          <option value="" selected disabled hidden>Choose situation</option>
              {nodeList.map(node => 
                  <option key={node.id} value={node.id} >{node.situation}</option>
              )}
              </select><br/>
              <textarea name="option" rows="4" cols="50" onChange={handleChange} placeholder="What action is taken? " className="border-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required></textarea><br/>
              <select name="next" onChange={handleChange} required>
              <option value="" selected disabled hidden>Choose situation</option>
              {nodeList.map(node => 
                  <option key={node.id} value={node.id} >{node.situation}</option>
              )}
              </select>
              <button >Add connection</button> {/* disabled={newEdge.start === newEdge.next} */}
      </form>
      {error&&<div>{error}</div>}
      </div>;
}
