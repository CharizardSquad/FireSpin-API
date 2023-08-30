/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/semi */
import React, { type ReactElement, useState, type ChangeEvent, type FormEvent } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { type JsxElement } from 'typescript';
// import { GoogleLogin } from "google-auth-library";
function Login (): ReactElement {
  const navigate = useNavigate();
  const [{ username, password }, setSignIn] = useState({
    username: '',
    password: ''
  });

  // const formData = new FormData();
  // const req = async (): Promise<string> =>
  // await fetch('/login', {
  //   method: 'POST',
  //   body: formData,
  // });

  // const resText= req.text();
  // setSignIn(resText);
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
        method: 'GET',
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
      {/* <h2>Sign in with Google</h2> */}
      {/* <GoogleLogin
        clientId="YOUR_CLIENT_ID"
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      /> */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" onChange={handleChange} value={username} name="username" />
        <label>Password</label>
        <input type="password" value={password} id="password" onChange={handleChange} name="password" />
        <button type="submit">Submit</button>
      </form>
      {/* <button type="button" className="navButton" onClick={(): void => { navigate('/Home') }}>
        Login
      </button> */}
    </div>
  );
}

export default Login;
