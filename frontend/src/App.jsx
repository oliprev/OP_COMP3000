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
import TopicPage from './pages/TopicPage'
import SubtopicPage from './pages/SubtopicPage'
import SectionPage from './pages/SectionPage'
import PhishingSimulationPage from './pages/PhishingSimulationPage'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'


function App() {

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<ProtectedRoute element ={MainPage} />} />
          <Route path="/main/topics/" element={<ProtectedRoute element ={TopicPage} />} />
          <Route path="/main/topics/:topic/subtopics" element={<ProtectedRoute element ={SubtopicPage} />} />
          <Route path="/main/topics/:topic/subtopics/:subtopic/sections" element={<ProtectedRoute element ={SectionPage} />} />
          <Route path="/main/gemini" element={<ProtectedRoute element ={CybersecurityQueryPage} />} />
          <Route path="/main/phishing" element={<ProtectedRoute element ={PhishingSimulationPage} />} />
          <Route path="/main/profile" element={<ProtectedRoute element ={ProfilePage} />} />
          <Route path="/main/profile/updatepassword" element={<ProtectedRoute element ={UpdatePasswordPage} />} />
          <Route path="/main/profile/deleteprofile" element={<ProtectedRoute element ={DeleteProfilePage} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App
