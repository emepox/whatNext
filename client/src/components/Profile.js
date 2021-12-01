import React from 'react'

import GridStories from './GridStories';

export default function Dashboard() {
  return (
    <div className="bg-gradient-to-r from-white to-grayBg via-grayVia h-screen">
       
      {/* <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-3"> */}
      <div className="md:container md:mx-auto">
       <GridStories/>
      </div>
      </div>
  )
}
