import React, { type ReactElement } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import './style.css'
import NavBar from './Components/NavBar'
import Login from './Components/Login'
// import Home from './Main'

function App (): ReactElement {
  return (
    <div>
      {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <NavBar />
      {/* </BrowserRouter> */}

    </div>
  )
}
export default App
