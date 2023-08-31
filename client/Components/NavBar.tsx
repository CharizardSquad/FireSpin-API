import React, { useState, type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
// import Login from './Login'
import History from './History'

function NavBar (): ReactElement {
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <div className="navBar">
      <button type="button" className="navButton" onClick={(): void => { navigate('/') }}>
        SignOut
      </button>
      {/* <button type="button" className="navButton" onClick={(): void => { navigate('/History') }}>
        History
      </button> */}
      <button type="button" className="navButton" onClick={openModal}>
        History
      </button>
      {isModalOpen && <History closeModal={closeModal} />}
    </div>
  )
}

export default NavBar
