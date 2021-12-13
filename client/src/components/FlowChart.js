import React, { useState, useEffect } from "react";
import ReactFlow, { MiniMap, Controls } from "react-flow-renderer";
import NodeCard from "./NodeCard";
import Noty from "noty";

const axios = require("axios");

export default function FlowTest({ nodeList, getNodes }) {
  const [elements, setElements] = useState(null);
  const [edge, setEdge] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    formater();
  }, [nodeList]);

  const formater = () => {
    setElements(
      nodeList
        .map((node) => ({
          id: `${node.id}`,
          data: { node, getNodes, handleCancel },
          type: "special",
          position: { x: node.id * 10, y: node.id * 10 },
        }))
        .concat(
          nodeList
            .filter((e) => e.Start.length)
            .map((node) =>
              node.Start.map((e) => ({
                id: `e${e.start}-${e.next}`,
                source: `${e.start}`,
                target: `${e.next}`,
                label: `${e.option}`,
                arrowHeadType: "arrowclosed",
              }))
            )
        )
        .flat(2)
    );
    //     setElements(state => state.concat(nodeList.filter(e => e.Start.length).map(node => node.Start.map(e => ({ id: `e${e.start}-${e.next}`, source: e.start, target: e.next })))))
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };
  const handleCancel = () => {
    setEdge(null);
    setText("");
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    const { source, target } = edge;
    try {
      await axios(`/nodes/${source}/edges`, {
        method: "PUT",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          nextId: target,
          option: text,
        },
      });
      getNodes();
      setEdge(null);
      setText("");
      new Noty({
        theme: "sunset",
        type: "success",
        layout: "topRight",
        text: "Connection added successfully ✨",
        timeout: 2000,
      }).show();
      new Noty({
        theme: "sunset",
        type: "information",
        layout: "topRight",
        text: "👉 Now you can EDIT your scenarios, CREATE another scenario and/or CONNECT other scenarios",
        timeout: 6000,
      }).show();
    } catch (error) {
      new Noty({
        theme: "sunset",
        type: "error",
        layout: "topRight",
        text: `${error.message}`,
        timeout: 2000,
      }).show();
    }
  };

  return (
    <div className="h-full flex">
      <div className="h-full border-2 flex-1">
        {elements && (
          <ReactFlow
            elements={elements}
            nodeTypes={{ special: NodeCard }}
            onConnect={(params) => setEdge(params)}
          >
            <MiniMap />
            <Controls />
          </ReactFlow>
        )}
      </div>
      {edge && (
        <div className="flex-initial ml-4 basis-1/5">
          <form className="mt-4" onSubmit={handleConnect}>
            <p className="text-gray-700 mb-3">
              Add an action that will lead from the first situation to the next.
            </p>
            <textarea
              rows="2"
              onChange={handleChange}
              placeholder="Type in an action"
              value={text}
              className="w-full border-2 border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            ></textarea>
            <button className="text-white bg-green-400 py-2 px-3 rounded-full m-2 hover:bg-green-500 hover:shadow-lg">
              add action
            </button>
          </form>
          <button
            onClick={handleCancel}
            className="text-white bg-red-400 py-2 px-3 rounded-full m-2 hover:bg-red-500 hover:shadow-lg"
          >
            cancel
          </button>
        </div>
      )}
    </div>
  );
}
