import React, { useState, useEffect } from "react";
import ReactFlow, { MiniMap, Controls, isNode } from "react-flow-renderer";
import NodeCard from "./NodeCard";
import Noty from "noty";

const axios = require("axios");

export default function FlowTest({ nodeList, getNodes }) {
  const [elements, setElements] = useState(null);
  const [edge, setEdge] = useState(null);
  const [edited, setEdited] = useState(false);
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
          position: {x:node.x, y:node.y},
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
    setEdited(false);
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    const { source, target } = edge;
    try {
      await axios(`/api/nodes/${source}/edges`, {
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
      setEdited(false);
      new Noty({
        theme: "sunset",
        type: "success",
        layout: "topRight",
        text: "Action added successfully ✨",
        timeout: 1000,
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

  const handleAddEdge = (params) => {
    setEdited(false);
    setText("");
    setEdge(params);
  };

  const handleEdit = (event, edge) => {
    event.preventDefault();
    setEdited(true);
    const editedNode = elements.find((e) => e.id === edge.id);
    setEdge(editedNode);
    setText(editedNode.label);
  };

  const handleDeleteEdge = async () => {
    const { source, target } = edge;
    try {
      await axios(`/api/nodes/${source}/edges`, {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          nextId: target,
        },
      });
      getNodes();
      setEdge(null);
      setText("");
      setEdited(false);
      new Noty({
        theme: "sunset",
        type: "success",
        layout: "topRight",
        text: "Action deleted!",
        timeout: 1000,
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

  const handleCoordinates = async (event, node) => {
    const {id, position} = node
    try {
      await axios(`/api/nodes/${id}/coords`, {
        method: "PUT",
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          x: position.x,
          y: position.y,
        },
      });
      getNodes();
    } catch (error) {
      new Noty({
        theme: "sunset",
        type: "error",
        layout: "topRight",
        text: `${error.message}`,
        timeout: 2000,
      }).show();
    }
  }

  return (
    <div className="h-full flex">
      <div className="h-full w-full flex basis-2/3 flex-col-reverse md:flex-row space-x-4">
      <div className="h-full w-full border-2 rounded">
        {elements && (
          <ReactFlow
            elements={elements}
            nodeTypes={{ special: NodeCard }}
            onConnect={(params) => handleAddEdge(params)}
            onEdgeContextMenu={handleEdit}
            onNodeDragStop={handleCoordinates}
          >
            <MiniMap className="hidden md:block "/>
            <Controls />
          </ReactFlow>
        )}
      </div>
      
      {edge && (
        <div className="">
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
              {edited ? "save action" : "add action"}
            </button>
          </form>
          {edited && (
            <button
              onClick={handleDeleteEdge}
              className="text-white bg-red-400 py-2 px-3 rounded-full m-2 hover:bg-red-500 hover:shadow-lg"
            >
              delete action
            </button>
          )}
          <button
            onClick={handleCancel}
            className="text-white bg-red-400 py-2 px-3 rounded-full m-2 hover:bg-red-500 hover:shadow-lg"
          >
            cancel
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
