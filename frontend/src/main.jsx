import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

// Set global base URL ensuring it falls back to your Vercel URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "https://kharidari-backend-jet.vercel.app";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

