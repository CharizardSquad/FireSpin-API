/* eslint-disable @typescript-eslint/semi */
import React, { type ReactElement, useState, ChangeEvent, FormEvent } from 'react';
// import { GoogleLogin } from "google-auth-library";
 function Login():ReactElement {
  const [{username, password}, setSignIn] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    console.log('Form was submitted!');
  };



  // const formData = new FormData();
  // const req = async (): Promise<string> => 
  // await fetch('/login', {
  //   method: 'POST',
  //   body: formData,
  // });
  
  // const resText= req.text();
  // setSignIn(resText);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignIn({
      username: e.target.value,
      password: e.target.value,
    });
  }

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
        <label htmlFor='username'>Username</label>
          <input type="text" id="username" onChange={handleChange} value={username}></input>
          <label>Password</label>
          <input type="password" value={password} id="password"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;

