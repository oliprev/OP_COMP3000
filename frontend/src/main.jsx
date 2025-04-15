import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './axiosHeaders.jsx';

createRoot(document.getElementById('root')).render(
  <App />
)
