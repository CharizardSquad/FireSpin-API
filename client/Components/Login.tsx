/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/semi */
import React, { type ReactElement, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'
// import { type JsxElement } from 'typescript';
// import { GoogleLogin } from "google-auth-library";
function Login (): ReactElement {
  const navigate = useNavigate();
  const [{ username, password }, setSignIn] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setSignIn((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<any> => {
    event.preventDefault();
    try {
      const response = await fetch('api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
        
      })
      if (response.ok) {
        // need auth logic here
        console.log('Form submitted successfully')
        navigate('/Home')
      }
      console.log('Error submitting form.')
    } catch (err: any) {
      console.log(`An error occurred: ${err}`)
    }
  };

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

export default Login;
