
import React, { useRef } from 'react'
import GridStories from './GridStories';
import useAuth from "../hooks/useAuth";


export default function Profile() {
  const parallax = useRef(null);
  const auth = useAuth();

  return (
    
      <div>
        <GridStories view={"profile"} />
      </div>


  );
}
