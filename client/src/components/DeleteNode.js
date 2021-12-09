import React, {useState} from 'react'
import Select from 'react-select'
import Noty from 'noty';
import "../../node_modules/noty/lib/themes/sunset.css";
import "../../node_modules/noty/lib/noty.css";
const axios = require('axios');

export default function DeleteNode({getNodes, nodeList}) {
    const [deletedNode, setDeletedNode] = useState(null)

    const handleChangeSelect = (selectedOption) => {
        setDeletedNode((state => ({id:selectedOption.value, situation:selectedOption.label})))
    }

    const handleChange = event =>{
        setDeletedNode(state => ({...state, situation:event.target.value}))
    }
    const handleClick = async (id) =>{
        try {
            await axios(`/nodes/${id}`, {
            method: 'DELETE',
          });
          getNodes()
          new Noty({
            theme: 'sunset',
            type: 'success',
            layout: 'topRight',
            text: 'Scenario deleted successfully ✨',
            timeout: 2000,
          }).show();
          new Noty({
            theme: 'sunset',
            type: 'information',
            layout: 'topRight',
            text: "👉 Now you can EDIT other scenarios, CREATE a new one and/or CONNECT them!",
            timeout: 6000,
          }).show();
        } catch (error) {
          console.log(error);
          new Noty({
            theme: 'sunset',
            type: 'error',
            layout: 'topRight',
            text: `${error.message}`,
            timeout: 2000
          }).show();
        }
    }

    return (
        <div>
            <p className="text-white font-mono mb-3"> What scenario do you want to delete?</p>
            <Select 
                name="next"
                onChange={(selectedOption) => handleChangeSelect(selectedOption)}
                required
                options={nodeList.map(node => {return {label:node.situation, value:node.id}})}
            />
            <br/>
              {
                  deletedNode && 
                  <div>
                  <textarea value={deletedNode.situation} rows="4" cols="50" onChange={handleChange} placeholder="What action is taken? " className="border-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" required></textarea><br/>
                  <button onClick={handleClick}>Submit Changes</button>
                  </div>
              }
        </div>
    )
}
