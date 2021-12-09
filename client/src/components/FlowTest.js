import React, {useState, useEffect} from 'react'
import ReactFlow from 'react-flow-renderer';

export default function FlowTest({nodeList, getNodes}) {
    const [elements, setElements] = useState(null)

    const formater = () => {
        setElements(nodeList.map(node => ({id:node.id, data: { label: <div>node.</div> }})))
    }

    return (
        <div style={{ height: 300 }}>
            <ReactFlow elements={elements} />
      </div>
    )
}
