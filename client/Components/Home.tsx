import React, { useState, type ReactElement } from 'react'
import NavBar from './NavBar'
import LineGraph from './LineGraph'

function Home(): ReactElement {
  const [input, setInput] = useState('')
  const [callInput, setCallInput] = useState('')

  const handleCallChange = (e: any): void =>{
    setCallInput(e.target.value)
  }

  const handleInputChange = (e: any): void => {
    setInput(e.target.value)
  }
  const handlePasteClick = async (): Promise<any> => {
    try {
      const pastedText = await navigator.clipboard.readText();
      setInput(pastedText);
    } catch (err) {
      return 'Unable to paste text';
    }
  }
  return (
    <div>
      <input
        placeholder="insert API here"
        type="text"
        className="input-API"
        value={input}
        onChange={handleInputChange}
        disabled
      />
      <button type="submit" id="paste" onClick={handlePasteClick}>
        Paste
      </button>
      <input
        placeholder="Calls"
        type="text"
        className="call-freq"
        value={callInput}
        onChange={handleCallChange}
      />
      <NavBar />
      <LineGraph />
    </div>
  )
}

export default Home
