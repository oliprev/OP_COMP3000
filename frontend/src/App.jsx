import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './pages/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import ProfilePage from './pages/ProfilePage'
import UpdatePasswordPage from './pages/UpdatePasswordPage'
import DeleteProfilePage from './pages/DeleteProfilePage'
import CybersecurityQueryPage from './pages/CybersecurityQueryPage'
import ModulePage from './pages/ModulePage'
import PhishingSimulationPage from './pages/PhishingSimulationPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<ProtectedRoute element ={MainPage} />} />
        <Route path="/main/modules/" element={<ProtectedRoute element ={ModulePage} />} />
        <Route path="/main/gemini" element={<ProtectedRoute element ={CybersecurityQueryPage} />} />
        <Route path="/main/phishing" element={<ProtectedRoute element ={PhishingSimulationPage} />} />
        <Route path="/main/profile" element={<ProtectedRoute element ={ProfilePage} />} />
        <Route path="/main/profile/updatepassword" element={<ProtectedRoute element ={UpdatePasswordPage} />} />
        <Route path="/main/profile/deleteprofile" element={<ProtectedRoute element ={DeleteProfilePage} />} />
      </Routes>
    </Router>
  );
}

export default App
