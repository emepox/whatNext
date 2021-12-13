import React, { useState } from "react";
import { Handle } from "react-flow-renderer";
import Noty from "noty";
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
      await axios(`/nodes/${id}`, {
        method: "DELETE",
      });
      data.getNodes();
      data.handleCancel();
      new Noty({
        theme: "mint",
        type: "success",
        layout: "topRight",
        text: "Scenario deleted successfully ✨",
        timeout: 2000,
      }).show();
      new Noty({
        theme: "mint",
        type: "information",
        layout: "topRight",
        text: "👉 Now you can EDIT other scenarios, CREATE a new one and/or CONNECT them!",
        timeout: 6000,
      }).show();
    } catch (error) {
      console.log(error);
      new Noty({
        theme: "mint",
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
      await axios(`/nodes/edit/${id}`, {
        method: "PUT",
        data: {
          situation,
        },
      });
      data.getNodes();
      data.handleCancel();
      setEdited(false);
      new Noty({
        theme: "mint",
        type: "success",
        layout: "topRight",
        text: "Scenario edited successfully ✨",
        timeout: 2000,
      }).show();
      new Noty({
        theme: "mint",
        type: "information",
        layout: "topRight",
        text: "👉 Now you can EDIT other scenarios, CREATE a new one and/or CONNECT them!",
        timeout: 6000,
      }).show();
    } catch (error) {
      console.log(error);
      new Noty({
        theme: "mint",
        type: "error",
        layout: "topRight",
        text: `${error.message}`,
        timeout: 2000,
      }).show();
    }
  };

  return (
    <div className="flex p-5 bg-gray-100 justify-between rounded shadow-xl w-72">
      <Handle
        type="target"
        position="left"
        style={{ background: "#555" }}
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
            class="text-color-white px-4 py-1 text-sm text-left bg-white rounded hover:shadow"
          >
            done
          </button>
        </div>
      ) : (
        data && (
          <div className="col rounded text-center">{data.node.situation}</div>
        )
      )}
      <div class="col ml-2 text-white">
        <div class="">
          <div class="inline-block text-left dropdown">
            <span class="rounded-md shadow-sm">
              <button
                class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-gray-100 shadow-md rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 rounded-full"
                type="button"
                aria-haspopup="true"
                aria-expanded="true"
                aria-controls="headlessui-menu-items-117"
              >
                <span className="fontAwesome">&#xf142;</span>
              </button>
            </span>
            <div class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
              <div
                class="absolute right-0 w-56 mt-2 origin-top-right bg-white  border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                aria-labelledby="headlessui-menu-button-1"
                id="headlessui-menu-items-117"
                role="menu"
              >
                <div class="py-1">
                  <button
                    onClick={() => setEdited(true)}
                    tabindex="0"
                    class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                    role="menuitem"
                  >
                    Edit situation
                  </button>
                  <button
                    onClick={handleDelete}
                    tabindex="1"
                    class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
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
        style={{ background: "#555" }}
        isConnectable={isConnectable}
      />
    </div>
  );
}
