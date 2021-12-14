import React, { useState, useEffect } from "react";
import ReactFlow, { MiniMap, Controls, isNode } from "react-flow-renderer";
import NodeCard from "./NodeCard";
import Noty from "noty";
import dagre from 'dagre';

const axios = require("axios");

const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

export default function FlowTest({ nodeList, getNodes }) {
  const [elements, setElements] = useState(null);
  const [edge, setEdge] = useState(null);
  const [edited, setEdited] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    formater();
  }, [nodeList]);

  const formater = () => {
    console.log(nodeList);  
      const ells = nodeList
        .map((node) => ({
          id: `${node.id}`,
          data: { node, getNodes, handleCancel },
          type: "special",
          position:{},
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
        const elements = getLayoutedElements(ells)
        setElements(elements)
    //     setElements(state => state.concat(nodeList.filter(e => e.Start.length).map(node => node.Start.map(e => ({ id: `e${e.start}-${e.next}`, source: e.start, target: e.next })))))
  };

  const getLayoutedElements = (elements) => {
  dagreGraph.setGraph({ rankdir: "LR" });


  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: el.__rf.width, height: el.__rf.height });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = 'left';
      el.sourcePosition = 'right';

      // unfortunately we need this little hack to pass a slightly different position
      // to notify react flow about the change. Moreover we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      el.position = {
        x: nodeWithPosition.x - el.__rf.width / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - el.__rf.height / 2,
      };
    }

    return el;
  });
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
      await axios(`/nodes/${source}/edges`, {
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

  return (
    <div className="h-full flex">
      <div className="h-full border-2 flex-1">
        {elements && (
          <ReactFlow
            elements={elements}
            nodeTypes={{ special: NodeCard }}
            onConnect={(params) => handleAddEdge(params)}
            onEdgeContextMenu={handleEdit}
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
  );
}
