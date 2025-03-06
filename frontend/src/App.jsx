import React from 'react'
import Signup from "./components/Signup";
import Login from "./components/Login"
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import { Routes,Route,BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  const url = import.meta.env.VITE_API_URL;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup url={url} />} />
        <Route path="/home" element={<Home url={url} />} />
        <Route path="/login" element={<Login url={url} />} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
      </Routes>
    </Router>
  )
}

export default App
