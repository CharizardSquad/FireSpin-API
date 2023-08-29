/* eslint-disable @typescript-eslint/semi */
import React, { type ReactElement, useState, ChangeEvent, FormEvent } from 'react';
// import { GoogleLogin } from "google-auth-library";
 function Login():ReactElement {
  const [{username, password}, setSignIn] = useState({
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
    let formData;
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setSignIn((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
      event.preventDefault();
      console.log('Form was submitted!');
      try{
        const response = await fetch('api/login', {
          method: 'POST',
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify({ username, password })
        })
        if(response.ok){
          console.log('Form submitted successfully')
        } else{
          console.error('Error submitting form.')
        }
  
      } catch(err){
        console.error('An error occurred:', err)
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
        <label htmlFor='username'>Username</label>
          <input type="text" id="username" onChange={handleChange} value={username} name="username"></input>
          <label>Password</label>
          <input type="password" value={password} id="password" onChange={handleChange} name="password"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;

