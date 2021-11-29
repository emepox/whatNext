import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>  
        </Routes>
      </BrowserRouter>  
    </div>
  );
}


