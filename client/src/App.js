import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import React from "react";

import Register from "./components/Register";
import Login from "./components/Login";
import Creator from "./components/Creator";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>  
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Creator />} />
        </Routes>
      </BrowserRouter>  
    </div>
  );
}



