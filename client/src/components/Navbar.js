import React from 'react'
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Noty from "noty";
import "../../node_modules/noty/lib/themes/sunset.css";

export default function Navbar() {
  const auth = useAuth();

  // Logout
  const logout = () => {
    localStorage.removeItem("token");

    new Noty({
      theme: "sunset",
      type: "success",
      layout: "topRight",
      text: "Logging you out.",
      timeout: 1000,
    } ).show();
    window.location.href = "/";
  };


  return (
    <div className="sticky top-0 z-50">
      <div className="bg-navbarCustom shadow-3xl px-10 sm:px-5 py-8 sm:flex justify-between">
        <a
          href="/"
          className="block mt-1 text-xl leading-tight font-medium text-customWhite hover:text-indigo-500"
        >
          WhatNext
        </a>
        <div className="text-right space-x-3">
          <a
            href="/start"
            className="text-base leading-tight font-light text-customWhite hover:text-indigo-500"
          >
            create
          </a>
          <a className="text-customWhite">|</a>
          <a
            href="/play"
            className="text-base leading-tight font-light text-customWhite hover:text-indigo-500"
          >
            play
          </a>
          <a className="text-customWhite">|</a>
          {auth.isLoggedIn && (
            
            <NavLink
              to="/profile"
              className="text-base leading-tight font-light text-customWhite hover:text-indigo-500"
            >
              profile
            </NavLink>
            
          )}
          {auth.isLoggedIn && <a className="text-customWhite">|</a>}

           {!auth.isLoggedIn && (
            <NavLink
              to="/login"
              className="text-base leading-tight font-light text-white bg-purple-500 rounded-full hover:bg-purple-600 px-3 py-2"
            >
              login
            </NavLink>
          )}

          {!auth.isLoggedIn && (
            <NavLink
              to="/register"
              className="text-base leading-tight font-light text-white bg-purple-500 rounded-full hover:bg-purple-600 px-3 py-2"
            >
              sign up 
            </NavLink>
          )}

          {auth.isLoggedIn && (
            <NavLink
              to="/"
              className="text-base leading-tight font-light text-white bg-purple-500 rounded-full hover:bg-purple-600 px-3 py-2"
              onClick={logout}
            >
              logout
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
