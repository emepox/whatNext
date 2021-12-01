import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from './components/Navbar';
import Parallax from "./components/Parallax";
import DraggableList from "./components/Draggable";

import Register from "./components/Register";
import Login from "./components/Login";
import Story from './components/Story';
import Home from "./components/Home";
import Navbar from './components/Navbar';
import Dashboard from "./components/Profile";

import AuthProvider from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";


export default function App() {
  return (

    <div style={{ width: '100%', height: '100%' }}>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/play" element={<Dashboard />} />

            <Route path="/parallax" element={<Parallax />} />
          <Route path="/draggable" element={<DraggableList items={'Lorem ipsum dolor sit'.split(' ')} />} />

            <Route path="/story/:id/:page" element={<Story />} />


            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/create"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </div>
  );
}



