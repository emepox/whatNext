import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "../services/api";
import WheelPicker from 'react-simple-wheel-picker';

export default function Test() {
  const navigate = useNavigate();
  const { id, page } = useParams();
  const [currentNode, setCurrentNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState(null)
  const [selectedId, setSelectedId] = useState(0)

  useEffect(() => getCurrentNode(page), [page]);

  const getCurrentNode = async (id) => {
    setLoading(true);
    const node = await api.getNode(id);
    console.log(node);
    setCurrentNode(node);
    node.Start&&setData(node.Start.map(e => ({id:`${e.next}`, value:e.option})))
    console.log(data);
    setLoading(false);
  };
  // const data = currentNode.Start.map(e => ({id:`${e.next}`, value:e.option}))
 
  //   const getImage = async () => {
  //     import placeholder from "../img/placeholder.jpg"
  //     setImage(placeholder)
  //   }


  //----ANIMATION EFFECT----- 
  const handleOnChange = target => {
    // setSelectedId(target.id)
    console.log(target)
};

  return (

    <div className="flex flex-col items-center justify-center">

        {loading && <div>loading</div>}
        {currentNode && (
          
          <div className="">
            {/* <div>{image && <img src={image} />}</div> */}
            <div className="text-xl text-white font-mono italic flex flex-col items-center justify-center mb-3">
              {currentNode.situation}
            </div>
            
            <div className="w-full h-full p-StoryCustom flex flex-col items-center justify-center">
              {data&&<WheelPicker
              data={data}
              onChange={handleOnChange}
              height={150}
              width={100}
              titleText="Enter value same as aria-label"
              itemHeight={30}
              selectedID={data[0].id}
              color="#ccc"
              activeColor="#333"
              backgroundColor="#fff"
              />}
            </div>
            {selectedId&&<button onClick={navigate(`/test/1/${selectedId}`)}>next</button>}
          </div>

        )}
    </div>
  )
}

// import React from 'react';
// import WheelPicker from 'react-simple-wheel-picker';

// const data = [
//   {
//       id: '1',
//       value: 'test1'
//   },
//   {
//       id: '2',
//       value: 'test2'
//   },
//   {
//       id: '3',
//       value: 'test3'
//   },
//   {
//       id: '4',
//       value: 'test4'
//   },
//   {
//       id: '5',
//       value: 'test5'
//   }
// ];

// export default function Test() {
//     const handleOnChange = target => {
//         console.log(target);
//     };

//   return (
//     <div>
//         <WheelPicker
//             data={data}
//             onChange={handleOnChange}
//             height={150}
//             width={100}
//             titleText="Enter value same as aria-label"
//             itemHeight={30}
//             selectedID={data[0].id}
//             color="#ccc"
//             activeColor="#333"
//             backgroundColor="#fff"
//         />
//     </div>
//   )
// }