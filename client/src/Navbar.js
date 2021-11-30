import React from 'react'

export default function Navbar() {
  return (
    <div>
      <div className="bg-white opacity-70 shadow-lg px-12 py-8 grid grid-cols-2">
        <a
          href="/"
          class="block mt-1 text-lg leading-tight font-medium text-black hover:text-indigo-500"
        >
          ModularStory
        </a>
        <div className="text-right space-x-3">
          <a
            href="/login"
            class="text-base leading-tight font-light text-black hover:text-indigo-500"
          >
            Log In
          </a>
          <a
            href="/register"
            class="text-base leading-tight font-light text-black hover:text-indigo-500"
          >
            Sign Up
          </a>
          <a
            href="/create"
            class="text-base leading-tight font-light text-black hover:text-indigo-500"
          >
            Create a story
          </a>
          <a
            href="/play"
            class="text-base leading-tight font-light text-black hover:text-indigo-500"
          >
            Play a game
          </a>
          <a
            href="/#about"
            class="text-base leading-tight font-light text-black hover:text-indigo-500"
          >
            About
          </a>
        </div>
      </div>
    </div>
  ); 
}
