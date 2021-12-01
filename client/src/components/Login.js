import React, { useState } from "react";
import axios from "axios";
import Noty from "noty";

export default function Login() {

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
      window.location.href = "/profile";

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
    <section id="login">
      <h1>Log In</h1>
      <section>
        <form
          onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              value={username}
              onChange={(e) => handleChange(e)}
              
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <button type="submit">
            Log In
          </button>
        </form>
      </section>
    </section>
  );
}
