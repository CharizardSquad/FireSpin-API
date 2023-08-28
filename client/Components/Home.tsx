import React, { useState, type ReactElement } from 'react'
// import ReactDOM from 'react-dom'

function Home (): ReactElement {
  const [input, setInput] = useState('')

  const handleInputChange = (e: any): void => {
    setInput(e.target.value)
  }
  return (
    <div>
      <input
        placeholder="insert API here"
        onClick={handleInputChange}
      />
    </div>
  )
}

export default Home
