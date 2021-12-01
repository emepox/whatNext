import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import Register from "./components/Register";
import Login from "./components/Login";
import Story from './components/Story';
import Home from "./components/Home";
import Navbar from './components/Navbar';
import Dashboard from "./components/Dashboard";


import AuthProvider from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";


export default function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/play" element={<Dashboard />} />
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



