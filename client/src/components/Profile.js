
import React, { useRef, useState, useEffect } from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import GridStories from './GridStories';
import Favourites from './Favourites';
import axios from "axios";
import useAuth from "../hooks/useAuth";

const url = (name, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`


export default function Profile() {
  const parallax = useRef(null);
  const auth = useAuth();
  const [user, setUser] = useState([]);
  const [seeFavs, setSeeFavs] = useState(false);

  useEffect(() => {
    requestData();
  }, []);

  const switchView = () => {
    setSeeFavs(!seeFavs)
    console.log(seeFavs)
  };

  const requestData = async () => {
    try {
      const { data } = await axios("users/dashboard/", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
      <div>
        <GridStories isProfile={true} user={user.username}/>
      </div>


  );
}
