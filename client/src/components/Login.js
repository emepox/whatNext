import React, { useState, useRef } from "react";
import axios from "axios";
import Noty from "noty";
import "../../node_modules/noty/lib/themes/mint.css";
import "../../node_modules/noty/lib/noty.css";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import "./Login.css";


const url = (name, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`


export default function Login() {
  const parallax = useRef(null); 

// Login state
  const [logIn, setLogIn] = useState({
    username: "",
    password: "",
  } );
    
// Deconstruction
  const { username, password } = logIn;

// Event handler
  const handleChange = (e) => {
    const { value, name } = e.target;
    setLogIn((state) => ({ ...state, [name]: value }));
  };

// Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

// Called when submitting
  const login = async () => {
    try {
        const { data } = await axios("/users/login", {
          method: "POST",
          data: logIn,
        });
      //store it locally
      localStorage.setItem("token", data.token);

      new Noty({
        theme: "mint",
        type: "success",
        layout: "topRight",
        text: "You are logged in.",
        timeout: 1000,
      } ).show();
      window.location.href = "/profile";

    } catch (error) {
      console.log(error);

      new Noty({
        theme: "mint",
        type: "error",
        layout: "topRight",
        text: "Something went wrong.",
        timeout: 2000,
      }).show();
    }
  };
  
  return (
    <div  style={{ width: '100%', height: '100%', background: '#253237' }}> 
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
        <section id="login" className="md:container md:mx-auto">
          <div className="flex flex-col items-center justify-center">
            <form
              className="w-96 h-96 rounded-md bg-white p-10 space-y-5 shadow-lg opacity-90"
              onSubmit={(e) => handleSubmit(e)}>
              <div><p className="text-2xl mb-12 font-mono italic flex flex-col items-center justify-center">WhatNext</p></div>  
              <div className="flex flex-col items-center justify-center">
                <input
                  className="fontAwesome border-2 border-gray-200 pr-10 pl-2 py-1 mt-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  id="username"
                  name="username"
                  placeholder="&#xf007; Username"
                  value={username}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <input
                  className="fontAwesome border-2 border-gray-200 rounded pr-10 pl-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="&#xf023; Password"
                  value={password}
                  onChange={(e) => handleChange(e)}
                  required
                />
              </div>

              <div className="flex flex-col items-center justify-center">
                <button type="submit" className="bg-purple-500 px-3 py-2 mt-10 text-white text-base uppercase tracking-wide rounded-full py-2 px-5 hover:bg-purple-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ">
                  Log In
                </button>
              </div>
            </form>
          
          </div>
        </section>
    </ParallaxLayer>
    </Parallax>
    </div>
  );
}
