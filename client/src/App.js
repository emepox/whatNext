import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";


import ParallaxComponent from "./components/ParallaxComponent";
import DraggableList from "./components/Draggable";
import Register from "./components/Register";
import Login from "./components/Login";
import Story from './components/Story';
import Home from "./components/Home";
import Navbar from './components/Navbar';
import Profile from "./components/Profile";

import AuthProvider from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";


export default function App() {
  return (

    <div className="bg-bgColor" style={{ width: '100%', height: '100%' }}>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/play" element={<Profile />} />

            <Route path="/parallax" element={<ParallaxComponent />} />
          <Route path="/draggable" element={<DraggableList items={'Lorem ipsum dolor sit'.split(' ')} />} />

            <Route path="/story/:id/:page" element={<Story />} />


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
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </div>
  );
}



