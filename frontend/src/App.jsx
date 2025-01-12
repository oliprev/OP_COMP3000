import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App
