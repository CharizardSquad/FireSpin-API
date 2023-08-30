import React, { useState, type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
// import Login from './Login'

function NavBar (): ReactElement {
  const navigate = useNavigate()

  //   function GoLogin (): void { navigate('/login') }
  return (
    <div className="navBar"> 
      <button type="button" className="navButton" onClick={(): void => { navigate('/Home') }}>
        Home
      </button>
      <button type="button" className="navButton" onClick={(): void => { navigate('/History') }}>
        History
      </button>
    </div>
  )
}

export default NavBar
