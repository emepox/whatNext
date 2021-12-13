import React, {useState} from "react";
import Noty from 'noty';
import Select from 'react-select'
import "../../node_modules/noty/lib/themes/sunset.css";
import "../../node_modules/noty/lib/noty.css";
import { getNode } from "../services/api";
const axios = require('axios');

export default function AddEdge({nodeList, getNodes}) {

    const [newEdge, setNewEdge]= useState({
        start:null,
        next:null,
        option: ""
    })
    // const [error, setError] = useState("")

    const handleChangeSelect = (selectedOption, name) => {
        setNewEdge((state => ({...state, [name]:selectedOption.value})))
    }

    const handleChange = (event) => {
      const {name, value} = event.target
      setNewEdge((state => ({...state, [name]:value})))
    }

  async function addEdges() {
      const {start, next, option} = newEdge
      
    try {
        if(start===next) throw new Error("A scenario can't connect to itself; please select or create a different scenario!")
        if(!start||!next) throw new Error("Please select a node") //not necessary because selects are required inputs
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
      getNodes()
      new Noty({
        theme: 'sunset',
        type: 'success',
        layout: 'topRight',
        text: 'Connection added successfully ✨',
        timeout: 2000,
      }).show();
      new Noty({
        theme: 'sunset',
        type: 'information',
        layout: 'topRight',
        text: "👉 Now you can EDIT your scenarios, CREATE another scenario and/or CONNECT other scenarios",
        timeout: 6000,
      }).show();
    } catch (error) {
      new Noty({
        theme: 'sunset',
        type: 'error',
        layout: 'topRight',
        text: `${error.message}`,
        timeout: 2000
      }).show();
    }
  }

const handleSubmit = (event) => {
    event.preventDefault();
    addEdges();
 
  };


  return <div>
      <p className="text-white text-xl font-mono mb-3"> CONNECT SCENARIOS</p>
      <form onSubmit={handleSubmit}>
          <p className="text-white font-mono mb-3"> WHAT? Player reads:</p>
          <Select 
            name="start"
            onChange={(selectedOption) => handleChangeSelect(selectedOption, "start")}
            required
            options={nodeList.map(node => {return {label:node.situation, value:node.id}})}
          />
          {/* <select name="start" onChange={handleChange} required>
            <option value="" selected disabled hidden>Choose situation</option>
              {nodeList.map(node => 
                  <option key={node.id} value={node.id} >{node.situation}</option>
              )}
              </select> */}
          <br/>
          <p className="text-white font-mono mb-3"> If Player CHOOSES...</p>
          <textarea name="option" rows="4" onChange={handleChange} placeholder="Type in a choice" className="w-full border-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required></textarea><br/>
          <p className="text-white font-mono mb-3"> NEXT scenario will be:</p>
          <Select 
            name="next"
            onChange={(selectedOption) => handleChangeSelect(selectedOption, "next")}
            required
            options={nodeList.map(node => {return {label:node.situation, value:node.id}})}
          />
              {/* <select name="next" onChange={handleChange} required>
              <option value="" selected disabled hidden>Choose situation</option>
              {nodeList.map(node => 
                  <option key={node.id} value={node.id} >{node.situation}</option>
              )}
              </select> */}
          <button className="bg-blue-400 p-2 rounded m-2 hover:bg-blue-500 hover:shadow-lg">Add connection</button> {/* disabled={newEdge.start === newEdge.next} */}
      </form>
      {/* {error&&<div>{error}</div>} */}
    </div>;
}
