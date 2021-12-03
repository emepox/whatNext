import React, { useState, useEffect } from "react";
import GridStories from "./GridStories";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export default function Profile(isProfile) {
  const auth = useAuth();
  const [user, setUser] = useState([]);

  useEffect(() => {
    requestData();
  }, []);

  const requestData = async () => {
    try {
      const { data } = await axios("users/dashboard/", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(data);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-white to-grayBg via-grayVia h-screen">
      HELLO {user.username} I AM THE PROFILE PAGE
      <div className="md:container md:mx-auto">
        <GridStories isProfile={true} />
      </div>
    </div>
  );
}
