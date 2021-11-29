import React, { useState } from "react";
import axios from "axios";
import Noty from "noty";

export default function Register() {
  let [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState(null);
  const { username, email, password } = newUser;

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
      }).show();
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
    <section id="registration">
      <h1>Register</h1>
      <section>
        <form onSubmit={(e) => handleSubmit(e)}>
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
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={email}
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
            Submit
          </button>
        </form>
      </section>

      <section>{alert && <p>{alert}</p>}</section>
    </section>
  );
}
