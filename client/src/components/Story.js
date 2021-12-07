import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "../services/api";
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from '@react-spring/web'
import StylesDisplayCards from './StylesDisplayCards.module.css';

export default function Story() {
  const navigate = useNavigate();
  const { id, page } = useParams();
  const [currentNode, setCurrentNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => getCurrentNode(page), [page]);
  //   useEffect(() => {if (currentNode&&currentNode.media)getImage()}, [currentNode])

  const getCurrentNode = async (id) => {
    setLoading(true);
    const node = await api.getNode(id);
    console.log(node);
    setCurrentNode(node);
    setLoading(false);
  };

  //   const getImage = async () => {
  //     import placeholder from "../img/placeholder.jpg"
  //     setImage(placeholder)
  //   }


  //----ANIMATION EFFECT----- 
  const [open, setOpen] = useState(true)

  const springApi = useSpringRef()
  const { size, ...rest } = useSpring({
    
    ref: springApi,
    config: config.stiff,
    from: { size: '20%', background: 'white' },
    to: {
      size: open ? '100%' : '20%',
      background: open ? 'white' : 'white',
    },
  })

  const transApi = useSpringRef()
  const transition = useTransition(open ? currentNode : [], {
    ref: transApi,
    trail: 100 / currentNode,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  

  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ])

  const handleOption = (e, edge) => {
    e.preventDefault();
    setOpen(false);
    
    setTimeout(() => {
      navigate(`/story/${id}/${edge.next}`);
      setOpen(true);
    }, 1000);
   
  }

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
              <animated.div style={{ ...rest, width: size, height: size }} className="relative p-5 rounded shadow-md">
                {transition((style, edge) => (
                  <animated.div className="w-full h-full rounded-borderstoryCustom" style={style}>
                    <div className="grid grid-cols-3 gap-3">
                      {currentNode.Start ? (
                        currentNode.Start.map((edge) => (
                          
                            <button
                              className="bg-purple-400 p-2 rounded m-2 hover:bg-purple-500 hover:shadow-lg"
                              // onClick={() => navigate(`/story/${id}/${edge.next}`)}
                              onClick={(e) => handleOption(e, edge)}
                            >
                              {edge.option}
                            </button>
                        ))
                      ) : (
                        <button
                          className="bg-red-200 p-2 rounded hover:bg-red-300 hover:shadow-lg"
                          onClick={() => navigate(`/story/${id}/1`)}
                        >
                          finish
                        </button>
                      )}
                    </div>
                  </animated.div> 
                ))}
              </animated.div>
            </div>

          </div>
        )}
    
    </div>
  );
}
