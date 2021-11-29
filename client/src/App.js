import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Register from "./components/Register";
import Login from "./components/Login";

export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div>henlo</div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}
