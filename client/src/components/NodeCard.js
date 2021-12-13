import React from "react";
import ReactFlow, { Handle } from "react-flow-renderer";

export default function NodeCard({ data, isConnectable }) {
  return (
    <div className="flex p-5 bg-gray-100 justify-between rounded shadow-xl w-72">
      <Handle
        type="target"
        position="top"
        style={{ background: "#555" }}
        // isConnectable={isConnectable}
      />
      {data && <div className="col rounded text-center">{data.node.situation}</div>}
      <div class="col ml-2 text-white">
              <div class="">
                  <div class="inline-block text-left dropdown">
                    <span class="rounded-md shadow-sm">
                    <button class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-gray-100 shadow-md rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 rounded-full" 
                    type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
                    <span className="fontAwesome">
                      &#xf142;
                    </span>
                    </button>
                  </span>
                  <div class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">                    
                  <div class="absolute right-0 w-56 mt-2 origin-top-right bg-white  border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
                    <div class="py-1">
                      <button tabindex="0" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"  role="menuitem" >Edit situation</button>
                      <button tabindex="1" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" >Delete situation</button>
                    </div>
                  </div>  
                  </div> 
                  </div> 
              </div>              
            </div>
      
      {/* <button
        name="delete"
        className="fontAwesome text-red-800 bg-red-400 p-2 rounded-full m-2 hover:bg-yellow-500 hover:shadow-lg"
      >
        &#xf1f8; Delete
      </button>
      <button
        name="edit"
        className="text-yellow-700 bg-yellow-400 p-2 rounded-full m-2 hover:bg-yellow-500 hover:shadow-lg"
      >
        Edit Scenario
      </button> */}
      <Handle
        type="source"
        position="bottom"
        style={{ background: "#555" }}
        // isConnectable={isConnectable}
      />
    </div>
  );
}
