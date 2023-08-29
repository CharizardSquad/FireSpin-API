import React, { type ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import './style.css'
import NavBar from './Components/NavBar'
import Login from './Components/Login'
import logo from './assets/logo.png'
// import Home from './Main'

function App (): ReactElement {
  return (
    <div>
      <div className="logo-container">
        <img src={logo} alt="shiny charizard logo" id="logo" />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <NavBar />
    </div>
  )
}
export default App
