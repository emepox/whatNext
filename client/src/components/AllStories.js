import React, { useState, useEffect, useRef } from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import GridStories from "./GridStories";

const url = (name, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

  
export default function AllStories(isProfile) {
  const parallax = useRef(null);

  return (
    <div style={{ width: '100%', height: '200%', background: '#253237' }}>
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
          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl text-white font-mono italic mb-10 ">Select a Story</p>
            <GridStories isProfile={false} />
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
