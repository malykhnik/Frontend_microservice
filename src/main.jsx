import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import MainApp from "./MainApp.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainApp />
  </StrictMode>,
)
