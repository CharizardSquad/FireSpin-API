import { error } from 'console'
import React, { type ReactElement, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
// import Login from './Login'

function SignUp (): ReactElement {
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
      const response = await fetch('api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const resData = await response.json()
      console.log(resData)
      if (resData.redirect === '/login') {
        console.log('Successful SignUp')
        navigate('/')
      } else {
        return 'Unable to SignUp'
      }
    } catch (err: any) {
      console.log(`An error occurred: ${err}`)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" onChange={handleChange} value={username} name="username" />
        <label>Password</label>
        <input type="password" value={password} id="password" onChange={handleChange} name="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
