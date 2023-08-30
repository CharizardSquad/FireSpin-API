import React, { type ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import './style.css'
// import NavBar from './Components/NavBar'
import Login from './Components/Login'
import logo from './assets/logo.png'
import SignUp from './Components/SignUp'
// import Home from './Main'
import LineGraph from './Components/LineGraph'

function App (): ReactElement {
  return (
    <div>
      <div id="app-container">
        <div className="logo-container">
          <img src={logo} alt="shiny charizard logo" id="logo" />
        </div>
        <h3>FireSpin API</h3>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        {/* <NavBar /> */}
        {/* <LineGraph /> */}
      </div>
    </div>
  )
}
export default App
