/* eslint-disable @typescript-eslint/semi */
import React, { type ReactElement } from 'react'
// import { GoogleLogin } from "google-auth-library";
function Login (): ReactElement {
  // const responseGoogle = (response) =>{
  // console.log(response)
  // }
  return (
    <div>
      <h2>Sign in with Google</h2>
      {/* <GoogleLogin
        clientId="YOUR_CLIENT_ID"
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      /> */}
    </div>
  )
}

export default Login
