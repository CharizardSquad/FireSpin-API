/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/semi */
import React, { type ReactElement, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (response.status === 200) {
        // need auth logic here
        const data = await response.json();
        const redirectUrl = data.redirect;
        const { token } = data.token;

        Cookies.set('authToken', token, { expires: 1 / 24 });
        navigate(redirectUrl);
        // console.log('Form submitted successfully')
        // navigate('/Home')
      } else{
        const data = await response.json();
        console.log('Login failed')
        const redirectUrl = data.redirect;
        navigate(redirectUrl);
      }
    } catch (error: any) {
      console.error('An error occurred:', error);
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
