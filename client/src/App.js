import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import ParallaxComponent from "./components/ParallaxComponent";

import Register from "./components/Register";
import Login from "./components/Login";
import CreateStory from "./components/CreateStory";
import StoryDetails from "./components/StoryDetails";
import StoryPreview from "./components/StoryPreview";
import TestFlow from "./components/TestFlow";

import Story from './components/Story';
import Home from "./components/Home";
import Navbar from './components/Navbar';
import Profile from "./components/Profile";
import AllStories from './components/AllStories';

import AuthProvider from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";

import StoryPreview2 from './components/StoryPreview2';



export default function App() {
  return (

    <div style={{ width: '100%', height: '100%' }}>
    
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/play" element={<AllStories />} />
            <Route path="/" element={<ParallaxComponent />} />
            
            <Route path="/story/:id/:page" element={<Story />} />
            <Route path="/story/preview/:id" element={<StoryPreview />} />
            <Route path="/storypreview" element={<StoryPreview2 />} />
            <Route path="/testflow" element={<TestFlow />} />


            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/create"
              element={
                <PrivateRoute>
                  <CreateStory />
                </PrivateRoute>
              }
            />
            <Route
              path="/start"
              element={
                <PrivateRoute>
                  <StoryDetails />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>


    </div>
  );
}



