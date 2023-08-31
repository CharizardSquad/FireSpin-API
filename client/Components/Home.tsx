import React, { useState, useEffect, type ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
// import axios from 'axios'
import NavBar from './NavBar'
import LineGraph from './LineGraph'
// import type { LocationState } from '../../types/types'

function Home (): ReactElement {
  const location = useLocation()
  const [input, setInput] = useState('')
  const [callInput, setCallInput] = useState('')
  const [responseTimes, setResponseTimes] = useState<number[]>([])
  const [token, setToken] = useState('')

  useEffect(() => {
    if (location.state.token) {
      setToken(location.state.token)
    }
  }, [location.state])

  const handleCallChange = (e: any): void => {
    setCallInput(e.target.value)
  }

  const handleInputChange = (e: any): void => {
    setInput(e.target.value)
  }
  // const handlePasteClick = async (): Promise<any> => {
  //   try {
  //     const pastedText = await navigator.clipboard.readText()
  //     setInput(pastedText)
  //   } catch (err) {
  //     return 'Unable to paste text'
  //   }
  // }

  const handleGetData = async (): Promise<void> => {
    try {
      // console.log('home-token:', token)
      const response = await fetch('/api/add', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({
          url: input,
          calls: callInput
        })
      })

      if (!response.ok) {
        throw new Error('Error fetching data')
      }

      const responseData = await response.json()
      console.log('responseData:', responseData) // in ms?
      setResponseTimes(responseData)
    } catch (err) {
      console.error('Error fetching data', err)
    }
  }
  // console.log('right before render:', responseTimes)
  return (
    <div>
      <div id="home-container">
        <h1 id="homeText">Home</h1>
        <input
          placeholder="insert API here"
          type="text"
          className="input-API"
          value={input}
          onChange={handleInputChange}
        />
        {/* <button type="submit" id="paste" onClick={handlePasteClick}>
          Paste
        </button> */}
        <input
          placeholder="Calls"
          type="text"
          className="call-freq"
          value={callInput}
          onChange={handleCallChange}
        />
        <button type="button" onClick={handleGetData}>
          Fetch Data
        </button>
        {responseTimes.length > 0 && <LineGraph responseTimes={responseTimes} />}
      </div>
      <NavBar />
    </div>
  )
}

export default Home
