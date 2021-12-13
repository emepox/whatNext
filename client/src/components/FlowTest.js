import React, { useState, useEffect } from "react";
import ReactFlow from "react-flow-renderer";
import NodeCard from "./NodeCard";

export default function FlowTest({ nodeList, getNodes }) {
  const [elements, setElements] = useState(null);

  useEffect(() => {
    formater();
    console.log(elements);
  }, [nodeList]);

  const formater = () => {
    setElements(
      nodeList
        .map((node) => ({
          id: `${node.id}`,
          data: { node },
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

  return (
    <div className="h-full border-2">
      {elements && (
        <ReactFlow elements={elements} nodeTypes={{ special: NodeCard }} />
      )}
    </div>
  );
}
