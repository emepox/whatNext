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

export default function Test() {
  const navigate = useNavigate();
  const { id, page } = useParams();
  const [open, setOpen] = useState(false);
  const [currentNode, setCurrentNode] = useState(null);

  const currentOptions = (() => {
    if (!currentNode) {
      return [];
    }
    if (currentNode.edges && currentNode.edges.length > 0) {
      return currentNode.edges;
    } else {
      return [
        {
          next: '1',
          option: 'Finish'
        }
      ];
    }
  })();

  useEffect(() => {
    getCurrentNode(page)
  }, [id, page]);

  useEffect(() => {
    setOpen(true);
  }, [id, page]);

  const getCurrentNode = async (id) => {
    const node = await api.getNode(id);
    setCurrentNode(node);
  };

  function handleOption(e, edge) {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      navigate(`/test/${id}/${edge.next}`);
    }, 1500);
  }

  // Animations
  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: { size: '20%', background: 'hotpink' },
    to: {
      size: open ? '100%' : '20%',
      background: open ? 'white' : 'hotpink'
    }
  });
  const transApi = useSpringRef();
  const transition = useTransition(open ? currentOptions : [], {
    ref: transApi,
    trail: 400 / currentOptions.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 }
  });
  // This will orchestrate the two animations above, comment the last arg and it creates a sequence
  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6
  ]);
  return (
    <div className={StylesDisplayCards.wrapper}>
      <animated.div
        style={{ ...rest, width: size, height: size }}
        className={StylesDisplayCards.container}
      >
        {transition((style, item) => (
          <animated.div className={StylesDisplayCards.item} style={style}>
            <button onClick={(e) => handleOption(e, item)}>{item.option}</button>
          </animated.div>
        ))}
      </animated.div>
    </div>
  );
}
