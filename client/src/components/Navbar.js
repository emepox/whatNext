import React from 'react'
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Noty from "noty";

export default function Navbar() {
  const auth = useAuth();

  // Logout
  const logout = () => {
    localStorage.removeItem("token");

    new Noty({
      theme: "bootstrap-v4",
      type: "success",
      layout: "topRight",
      text: "Logging you out.",
      timeout: 1000,
    } ).show();
    window.location.href = "/";
  };


  return (
    <div>
      <div className="bg-navbarCustom shadow-lg px-10 py-8 grid grid-cols-2">
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
            Create a story
          </a>
          <a
            href="/play"
            className="text-base leading-tight font-light text-customWhite hover:text-indigo-500"
          >
            Play a game
          </a>
          {auth.isLoggedIn && (
            <NavLink
              to="/profile"
              className="text-base leading-tight font-light text-customWhite hover:text-indigo-500"
            >
              Profile
            </NavLink>
          )}
          <a
            href="/home"
            className="text-base leading-tight font-light text-customWhite hover:text-indigo-500"
          >
            About
          </a>

          <a className="text-customWhite">|</a>

           {!auth.isLoggedIn && (
            <NavLink
              to="/login"
              className="text-base leading-tight font-light text-white bg-purple-400 rounded-full hover:bg-purple-500 px-3 py-2"
            >
              Login
            </NavLink>
          )}

          {!auth.isLoggedIn && (
            <NavLink
              to="/register"
              className="text-base leading-tight font-light text-white bg-purple-400 rounded-full hover:bg-purple-500 px-3 py-2"
            >
              Sign Up 
            </NavLink>
          )}

          {auth.isLoggedIn && (
            <NavLink
              to="/"
              className="text-base leading-tight font-light text-white bg-purple-400 rounded-full hover:bg-purple-500 px-3 py-2"
              onClick={logout}
            >
              Logout
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
