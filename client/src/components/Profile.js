
import React, { useRef, useState, useEffect } from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import GridStories from './GridStories';
import axios from "axios";
import useAuth from "../hooks/useAuth";

const url = (name, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`


export default function Profile(isProfile) {
  const parallax = useRef(null);
  const auth = useAuth();
  const [user, setUser] = useState([]);

  useEffect(() => {
    requestData();
  }, []);

  const requestData = async () => {
    try {
      const { data } = await axios("users/dashboard/", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

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
            <div className="flex flex-col items-center justify-center">
              HELLO {user.username} I AM THE PROFILE PAGE
              <p className="text-2xl text-white font-mono italic mb-10 ">Your Stories</p>
              <GridStories isProfile={true} />
            </div>

        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
