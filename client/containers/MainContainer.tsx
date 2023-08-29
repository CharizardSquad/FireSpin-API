import React, { type ReactElement } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Components/Home'
import Login from '../Components/Login'
import History from '../Components/History'

function MainContainer (): ReactElement {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  )
}

export default MainContainer
