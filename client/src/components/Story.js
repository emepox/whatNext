import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "../services/api";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import Rating from 'react-rating';

import {
    useSpring,
    config,
    animated,
  } from '@react-spring/web'

const url = (name, wrap = false) =>
`${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

const axios = require("axios");

export default function Story() {
  const parallax = useRef(null);
  const navigate = useNavigate();
  const { id, page } = useParams();
  const [story, setStory] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState(null)
  const [selectedId, setSelectedId] = useState(0)

  useEffect(() => getCurrentNode(page), [page]);

  useEffect(() => getStory(id), []);

  const getCurrentNode = async (id) => {
    setLoading(true);
    const node = await api.getNode(id);
    console.log(node);
    setCurrentNode(node);
    console.log(data);
    setLoading(false);
  };

  const [flip, set] = useState(false)

  const getStory = async (id) => {
    try {
      const { data } = await axios.get(`/stories/${id}/`);
      setStory(data);
    } catch (error) {
      console.log(error);    
    }
  };

  //   const getImage = async () => {
  //     import placeholder from "../img/placeholder.jpg"
  //     setImage(placeholder)
  //   }


  const { scroll } = useSpring({
    scroll: (currentNode && currentNode.length - 1) * 50,
    from: { scroll: 0 },
    reset: false,
    reverse: flip,
    delay: 200,
    config: config.molasses,
    // onRest: () => set(!flip),
  })

  return (
    
    <div style={{ width: '100%', height: '100%', background: '#253237' }}>
      <Parallax ref={parallax} pages={1}>
        <ParallaxLayer
            offset={0}
            speed={0}
            factor={3}
            style={{
              backgroundImage: url('stars', true),
              backgroundSize: 'cover',
            }}
          />
      
        <ParallaxLayer 
          offset={0}
          speed={0.1}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {loading && <div>loading</div>}
          {currentNode && (
            
            <div className="">
              <div className="text-xl font-mono text-white italic flex flex-col items-center justify-center mb-5">
                {currentNode.situation}
              </div>
              <p className="text-white mb-3 font-mono text-gray-400">Scroll and select an option from the list below</p>
              <div className="bg-white rounded font-mono text-purple-500"> 
                <animated.div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 60,
                    overflow: 'auto',
                    fontSize: '1em',
                    padding: 5,
                  }}
                  scrollTop={scroll}>
                    {currentNode.Start ? (
                      currentNode.Start.map((edge) => (
                          <a
                            className="flex flex-col items-center justify-top hover:underline"
                            onClick={() => navigate(`/story/${id}/${edge.next}`)}
                            // key={`${word}_${i}`}
                            style={{ width: '100%', height: 40, textAlign: 'center' }}
                          >
                            {edge.option}
                          </a>
                      ))
                    ) : (
                      <a
                        className="flex flex-col items-center justify-center hover:underline"
                        onClick={() => navigate(`/story/${id}/1`)}
                        style={{ width: '100%', height: 50, textAlign: 'center' }}

                      >
                        finish
                      </a>
                    )}
                
                </animated.div>
              </div>
            </div>

          )}
        </ParallaxLayer>
      </Parallax>
    </div>
    
  )
}



// ---------------------PREVIOUS STORY.JS-----------------------------
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import * as api from "../services/api";
// import {
//   useTransition,
//   useSpring,
//   useChain,
//   config,
//   animated,
//   useSpringRef,
// } from '@react-spring/web'
// import StylesDisplayCards from './StylesDisplayCards.module.css';

// export default function Story() {
//   const navigate = useNavigate();
//   const { id, page } = useParams();
//   const [currentNode, setCurrentNode] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [image, setImage] = useState(null);

//   useEffect(() => getCurrentNode(page), [page]);
//   //   useEffect(() => {if (currentNode&&currentNode.media)getImage()}, [currentNode])

//   const getCurrentNode = async (id) => {
//     setLoading(true);
//     const node = await api.getNode(id);
//     console.log(node);
//     setCurrentNode(node);
//     setLoading(false);
//   };

//   //   const getImage = async () => {
//   //     import placeholder from "../img/placeholder.jpg"
//   //     setImage(placeholder)
//   //   }


//   //----ANIMATION EFFECT----- 
//   const [open, setOpen] = useState(true)

//   const springApi = useSpringRef()
//   const { size, ...rest } = useSpring({
    
//     ref: springApi,
//     config: config.stiff,
//     from: { size: '100%', background: 'white' },
//     to: {
//       size: open ? '100%' : '50%',
//       background: open ? 'white' : 'white',
//     },
//   })

//   const transApi = useSpringRef()
//   const transition = useTransition(open ? currentNode : [], {
//     ref: transApi,
//     trail: 100 / currentNode,
//     from: { opacity: 0, scale: 0 },
//     enter: { opacity: 1, scale: 1 },
//     leave: { opacity: 0, scale: 0 },
//   });

//   useChain(open ? [springApi, transApi] : [transApi, springApi], [
//     0,
//     open ? 0.1 : 0.6,
//   ])

//   const handleOption = (e, edge) => {
//     e.preventDefault();
//     setOpen(false);
    
//     setTimeout(() => {
//       navigate(`/story/${id}/${edge.next}`);
//       setOpen(true);
//     }, 1000);
   
//   }
//   console.log(currentNode);

//   return (
//     <div className="flex flex-col items-center justify-center">
//     <div className="">
        
        // {loading && <div>loading</div>}
        // {currentNode && story &&  (
        //   <div className="">
        //     {/* <div>{image && <img src={image} />}</div> */}
        //     <div className="text-3xl text-white font-mono italic flex flex-col items-center justify-center mb-3">
        //       {story.name}
        //     </div>
        //     <div className="text-m text-white font-mono italic flex flex-col items-center justify-center mb-3">
        //       by {story.User.username}
        //     </div>
        //     <hr/>
        //     <div className="text-xl text-white font-light flex flex-col items-center justify-center mt-5 mb-3">
        //       {currentNode.situation}
        //     </div>
        //     <Rating/>
            
// //             <div className="w-full h-full p-StoryCustom flex flex-col items-center justify-center">
              
// //               <animated.div style={{ ...rest, width: size, height: size }} className="relative p-5 rounded shadow-md"
//               >
//                 {/* Select an option */}
//                 {transition((style, edge) => (
//                   <animated.div className="w-full h-full rounded-borderstoryCustom" style={style}>
//                     <div className="grid grid-cols-3 gap-3">
//                       {currentNode.Start ? (
//                         currentNode.Start.map((edge) => (
                          
//                             <button
//                               className="bg-purple-400 p-2 rounded m-2 hover:bg-purple-500 hover:shadow-lg"
//                               // onClick={() => navigate(`/story/${id}/${edge.next}`)}
//                               onClick={(e) => handleOption(e, edge)}
//                             >
//                               {edge.option}
//                             </button>
//                         ))
//                       ) : (
//                         <button
//                           className="bg-red-200 p-2 rounded hover:bg-red-300 hover:shadow-lg"
//                           onClick={() => navigate(`/story/${id}/1`)}
//                         >
//                           finish
//                         </button>
//                       )}
//                     </div>
//                   </animated.div> 
                  
//                 ))}
                  
//               </animated.div>
              
//             </div>
//           </div>
//         )}
//     </div>
//     </div>
//   );
// }




