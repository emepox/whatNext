import React, {useState} from 'react'
import Select from 'react-select'
import Noty from 'noty';
import "../../node_modules/noty/lib/themes/mint.css";
import "../../node_modules/noty/lib/noty.css";
const axios = require('axios');

export default function EditNode({getNodes, nodeList}) {
    const [editedNode, setEditedNode] = useState(null)

    // const handleChoice = event => {
    //     setEditedNode(nodeList[event.target.value])
    // }
    const handleChangeSelect = (selectedOption) => {
        setEditedNode((state => ({id:selectedOption.value, situation:selectedOption.label})))
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
          new Noty({
            theme: 'mint',
            type: 'success',
            layout: 'topRight',
            text: 'Scenario edited successfully ✨',
            timeout: 2000,
          }).show();
          new Noty({
            theme: 'mint',
            type: 'information',
            layout: 'topRight',
            text: "👉 Now you can EDIT other scenarios, CREATE a new one and/or CONNECT them!",
            timeout: 6000,
          }).show();
        } catch (error) {
          console.log(error);
          new Noty({
            theme: 'mint',
            type: 'error',
            layout: 'topRight',
            text: `${error.message}`,
            timeout: 2000
          }).show();
        }
    }

    return (
        <div>
            <Select 
                name="next"
                onChange={(selectedOption) => handleChangeSelect(selectedOption)}
                required
                options={nodeList.map(node => {return {label:node.situation, value:node.id}})}
            />
            {/* <select name="start" onChange={handleChoice}>
                <option value="" selected disabled hidden>Choose Situation</option>
              {nodeList.map((node, i) => 
                  <option key={node.id} value={i} >{node.situation}</option>
              )}
            </select> */}
            <br/>
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
