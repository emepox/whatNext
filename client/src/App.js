import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import React from "react";
import Navbar from './Navbar';
import Parallax from "./components/Parallax";
import DraggableList from "./components/Draggable";

import Register from "./components/Register";
import Login from "./components/Login";

export default function App() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>  
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/parallax" element={<Parallax />} />
          <Route path="/draggable" element={<DraggableList items={'Lorem ipsum dolor sit'.split(' ')} />} />
        </Routes>
      </BrowserRouter>  
    </div>
  );
}



