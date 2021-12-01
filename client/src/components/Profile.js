import React from 'react'

import GridStories from './GridStories';

export default function Profile() {
  return (
    <div className="bg-gradient-to-r from-white to-grayBg via-grayVia h-screen">
      HELLO I AM THE PROFILE PAGE
      <div className="md:container md:mx-auto">
        <GridStories isProfile={true} />
      </div>
    </div>
  );
}
