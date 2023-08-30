/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/semi */
import React, { type ReactElement, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
// import { type JsxElement } from 'typescript';
// import { GoogleLogin } from "google-auth-library";

function Login (): ReactElement {
  const navigate = useNavigate()
  const [{ username, password }, setSignIn] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setSignIn((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<any> => {
    event.preventDefault()
    try {
      const response = await fetch('api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const resData = await response.json()
      console.log(resData)
      if (resData.redirect === '/signup') {
        // need auth logic here
        console.log('Form submitted successfully')
        navigate('/signup')
      } else {
        console.log('token:', resData.token)
        navigate('/home', { state: { token: resData.token } })
      }
    } catch (err: any) {
      console.log(`An error occurred: ${err}`)
    }
  }

  return (
    <div>
      <h1 id="loginText">LogIn</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" onChange={handleChange} value={username} name="username" />
        <label>Password</label>
        <input type="password" value={password} id="password" onChange={handleChange} name="password" />
        <button type="submit">Submit</button>
        <button type="button" onClick={(): void => {navigate('/signup')}}>Sign-Up</button>
      </form>
    </div>
  )
}

export default Login
