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
      <div className="bg-white opacity-70 shadow-lg px-12 py-8 grid grid-cols-2">
        <a
          href="/"
          className="block mt-1 text-lg leading-tight font-medium text-black hover:text-indigo-500"
        >
          ModularStory
        </a>
        <div className="text-right space-x-3">
          {!auth.isLoggedIn && (
            <NavLink
              to="/login"
              className="text-base leading-tight font-light text-black hover:text-indigo-500"
            >
              Login
            </NavLink>
          )}
          {!auth.isLoggedIn && (
            <NavLink
              to="/register"
              className="text-base leading-tight font-light text-black hover:text-indigo-500"
            >
              Sign Up
            </NavLink>
          )}
          <a
            href="/create"
            className="text-base leading-tight font-light text-black hover:text-indigo-500"
          >
            Create a story
          </a>
          <a
            href="/play"
            className="text-base leading-tight font-light text-black hover:text-indigo-500"
          >
            Play a game
          </a>
          {auth.isLoggedIn && (
            <NavLink
              to="/dashboard"
              className="text-base leading-tight font-light text-black hover:text-indigo-500"
            >
              Dashboard
            </NavLink>
          )}
          <a
            href="/#about"
            className="text-base leading-tight font-light text-black hover:text-indigo-500"
          >
            About
          </a>
          {auth.isLoggedIn && (
            <NavLink
              to="/#"
              className="text-base leading-tight font-light text-black hover:text-indigo-500"
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
