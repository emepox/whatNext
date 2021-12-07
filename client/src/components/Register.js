import React, { useState, useRef } from "react";
import axios from "axios";
import Noty from "noty";
import useAuth from "../hooks/useAuth";
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import "./Login.css";


const url = (name, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`


export default function Register() {
  const parallax = useRef(null);

  let [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);
  const { username, email, password } = newUser;
  const auth = useAuth();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewUser((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submited");
    addUser();
  };

    const addUser = async () => {
        console.log(newUser)
    try {
        const { data } = await axios( "/users/register", {
        method: "POST",
        data: newUser,
        } );
        
      setNewUser({
        username: "",
        email: "",
        password: "",
      });

      new Noty({
        theme: "bootstrap-v4",
        type: "success",
        layout: "topRight",
        text: "User registered.",
        timeout: 1000,
      } ).show();

      if ( !auth.isLoggedIn ) {
        await auth.signin( { username, password } );
        window.location.href = "/profile";
      }
      
      
    } catch (err) {
      setAlert(err[0]);
      console.log(err);
      new Noty({
        theme: "bootstrap-v4",
        type: "error",
        layout: "topRight",
        text: "Ouch! Something went wrong. Try again!",
        timeout: 2000,
      }).show();
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
          <section id="registration" className="">
            <div className="flex flex-col items-center justify-center">
              <form
                className="w-96 h-96 rounded-md bg-white p-11 space-y-4 shadow-lg opacity-90" 
                onSubmit={(e) => handleSubmit(e)}>
                <div className="flex flex-col items-center justify-center">
                  <p className="text-2xl mb-8 font-mono italic">WhatNext</p>
                </div>  

                <div className="flex flex-col items-center justify-center">
                  <input
                    className="fontAwesome border-2 border-gray-200 rounded pr-10 pl-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    id="username"
                    name="username"
                    value={username}
                    placeholder="&#xf007; Username"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>

                <div className="flex flex-col items-center justify-center">
                  <input
                    className="fontAwesome border-2 border-gray-200 rounded pr-10 pl-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="&#x40; Email"
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
                    value={password}
                    placeholder="&#xf023; Password"
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <button type="submit" className="bg-purple-500 px-3 py-2 mt-7 text-white text-base uppercase tracking-wide rounded-full py-2 px-5 hover:bg-purple-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ">
                    Sign up
                  </button>
                </div>
              </form>
              </div>
            <section>{alert && <p>{alert}</p>}</section>
          </section>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
