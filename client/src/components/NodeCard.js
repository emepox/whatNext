import React, { useState } from "react";
import { Handle } from "react-flow-renderer";
import Noty from "noty";
import "../../node_modules/noty/lib/themes/sunset.css";
import "../../node_modules/noty/lib/noty.css";
const axios = require("axios");

export default function NodeCard({ data, isConnectable }) {
  const [edited, setEdited] = useState(false);
  const [situation, setSituation] = useState(data.node.situation);

  const handleChange = (event) => {
    setSituation(event.target.value);
  };

  const handleDelete = async () => {
    const { id } = data.node;
    try {
        if (data.node.first) throw new Error("You can't delete the first situation")
      await axios(`/api/nodes/${id}`, {
        method: "DELETE",
      });
      data.getNodes();
      data.handleCancel();
      new Noty({
        theme: "sunset",
        type: "success",
        layout: "topRight",
        text: "Scenario deleted successfully ✨",
        timeout: 1000,
      }).show();
    } catch (error) {
      console.log(error);
      new Noty({
        theme: "sunset",
        type: "error",
        layout: "topRight",
        text: `${error.message}`,
        timeout: 2000,
      }).show();
    }
  };

  const handleEdit = async () => {
    const { id } = data.node;
    try {
      await axios(`/api/nodes/edit/${id}`, {
        method: "PUT",
        data: {
          situation,
        },
      });
      data.getNodes();
      data.handleCancel();
      setEdited(false);
      new Noty({
        theme: "sunset",
        type: "success",
        layout: "topRight",
        text: "Scenario edited successfully ✨",
        timeout: 1000,
      }).show();
    } catch (error) {
      console.log(error);
      new Noty({
        theme: "sunset",
        type: "error",
        layout: "topRight",
        text: `${error.message}`,
        timeout: 2000,
      }).show();
    }
  };

  const handleSetFirst = async () => {
    const { id, StoryId } = data.node;
    await axios.put(`/api/stories/${StoryId}/first`, { firstId: id });
    new Noty({
        theme: "sunset",
        type: "success",
        layout: "topRight",
        text: "Situation set as a starting point",
        timeout: 2000,
      }).show();
    data.getNodes();
  }

  return (
    <div className={`flex p-5 ${data.node.first?"bg-purple-300":"bg-gray-100"} justify-between rounded shadow-xl w-72`}>
      <Handle
        type="target"
        position="left"
        style={{backgroundColor: "red", padding:"0.25rem"}}
        isConnectable={isConnectable}
      />
      {edited ? (
        <div>
          <textarea
            value={situation}
            rows="2"
            onChange={handleChange}
            placeholder="Type in a scenario"
            className="w-full border-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            required
          ></textarea>
          <button
            onClick={handleEdit}
            className="text-color-white px-4 py-1 text-sm text-left bg-white rounded hover:shadow"
          >
            done
          </button>
        </div>
      ) : (
        data && (
          <div className="col rounded text-center">{data.node.situation}</div>
        )
      )}
      <div className="col ml-2 text-white">
        <div className="">
          <div className="inline-block text-left dropdown">
            <span className="rounded-md shadow-sm">
              <button
                className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-gray-100 shadow-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 rounded-full"
                type="button"
                aria-haspopup="true"
                aria-expanded="true"
                aria-controls="headlessui-menu-items-117"
              >
                <span className="fontAwesome">&#xf142;</span>
              </button>
            </span>
            <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
              <div
                className="absolute right-0 w-56 mt-2 origin-top-right bg-white  border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                aria-labelledby="headlessui-menu-button-1"
                id="headlessui-menu-items-117"
                role="menu"
              >
                <div className="py-1">
                  <button
                    onClick={() => setEdited(true)}
                    tabindex="0"
                    className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                    role="menuitem"
                  >
                    Edit situation
                  </button>
                  <button
                    onClick={handleSetFirst}
                    tabindex="0"
                    className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                    role="menuitem"
                  >
                    Set as starting point
                  </button>
                  <button
                    onClick={handleDelete}
                    tabindex="1"
                    className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                  >
                    Delete situation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position="right"
        style={{backgroundColor: "green", padding:"0.25rem"}}
        isConnectable={isConnectable}
      />
    </div>
  );
}
