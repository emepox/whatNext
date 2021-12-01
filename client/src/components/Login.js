import React, { useState, useRef } from "react";
import axios from "axios";
import Noty from "noty";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

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
        theme: "bootstrap-v4",
        type: "success",
        layout: "topRight",
        text: "You are logged in.",
        timeout: 1000,
      } ).show();
      window.location.href = "/dashboard";

    } catch (error) {
      console.log(error);

      new Noty({
        theme: "bootstrap-v4",
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
              className="w-96 h-96 rounded-md bg-white p-11 space-y-4 shadow-lg opacity-90"
              // className="bg-white w-96 h-96 rounded-md flex flex-col items-center justify-center"
              onSubmit={(e) => handleSubmit(e)}>
              <div><p className="text-2xl mb-12 ml-20 font-mono italic">WhatNext</p></div>  
              <div>
                <label htmlFor="username" className="text-gray-500">Username</label>
                <input
                  className="border-2 border-gray-200 rounded ml-5 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label htmlFor="password" className="text-gray-500">Password</label>
                <input
                  className="border-2 border-gray-200 rounded ml-6 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="mt-6">
                <button type="submit" className="bg-purple-500 px-3 py-2 ml-20 mt-10 text-white text-base uppercase tracking-wide rounded-full py-2 px-5 hover:bg-purple-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ">
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
