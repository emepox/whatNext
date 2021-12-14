
import React, { useState, useEffect } from 'react'
import GridStories from './GridStories';
import axios from "axios";

export default function Profile() {
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
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
      <div>
        <GridStories isProfile={true} user={user.username}/>
      </div>


  );
}
