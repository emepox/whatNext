import React, { useState, useEffect } from "react";


import GridStories from "./GridStories";

export default function AllStories(isProfile) {
  return (
    <div className="bg-gradient-to-r from-white to-grayBg via-grayVia h-screen">
      HELLO I AM THE PLAY PAGE
      <div className="md:container md:mx-auto">
        <GridStories isProfile={false} />
      </div>
    </div>
  );
}
