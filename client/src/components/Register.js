import React, { useState} from "react";
import axios from "axios";
import Noty from "noty";
import "../../node_modules/noty/lib/themes/sunset.css";
import "../../node_modules/noty/lib/noty.css";
import useAuth from "../hooks/useAuth";

import "./Login.css";

export default function Register() {
  

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
    addUser();
  };

    const addUser = async () => {
    try {
        await axios( "/api/users/register", {
        method: "POST",
        data: newUser,
        } );
        
      setNewUser({
        username: "",
        email: "",
        password: "",
      });

      new Noty({
        theme: "sunset",
        type: "success",
        layout: "topRight",
        text: "Registration completed!",
        timeout: 2000,
      } ).show();

      if ( !auth.isLoggedIn ) {
        await auth.signin( { username, password } );
        window.location.href = "/profile";
      }
      
      
    } catch (err) {
      setAlert(err[0]);
      console.log(err);
      new Noty({
        theme: "sunset",
        type: "error",
        layout: "topRight",
        text: "Ouch! Something went wrong. Try again!",
        timeout: 2000,
      }).show();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center" style={{ width: '100%', height: '95%', background: '#f6f6f9' }}> 
      
      <section id="login" className="md:container md:mx-auto">
        <div className="flex flex-col items-center justify-center">
          <form
            className="w-auto h-auto rounded-md bg-white p-10 space-y-5 shadow-2xl opacity-90"
            onSubmit={(e) => handleSubmit(e)}>
            <div><p className="text-2xl flex flex-col items-center justify-center">Welcome!</p></div>

            <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
              Enter the information below to create your account
            </div>

            <div className="flex flex-col mb-5">
              <label htmlFor="username" className=" mt-4 mb-1 text-xs tracking-wide text-gray-600">Username:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <p className="fas fa-at text-blue-500">&#xf007;</p>
                </div>
                <input
                  id="username"
                  type="username"
                  name="username"
                  value={username}
                  onChange={(e) => handleChange(e)}
                  required
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Email:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <p className="fas fa-lock text-blue-500">&#xf023;</p>
                  </span>
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => handleChange(e)}
                  required
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="flex flex-col mb-6">
              <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
              <div className="relative">
                <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                  <span>
                    <p className="fas fa-lock text-blue-500">&#xf023;</p>
                  </span>
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => handleChange(e)}
                  required
                  className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div className="flex w-full">
              <button
                type="submit"
                className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-purple-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
              >
              <span className="mr-2 uppercase">Sign up</span>
              <span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </button>
          </div>

          </form>
          <span className="ml-2 mt-2">Do you have an account already?
            <a href="/login" className="text-xs ml-2 text-blue-500 font-semibold">LOG IN</a>
          </span>

        </div>
        <section>{alert && <p>{alert}</p>}</section>
      </section>
    </div>
  );
}
