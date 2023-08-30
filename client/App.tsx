import React, { type ReactElement } from 'react'
import logo from './assets/logo.png'
import './sass/App.scss'
import MainContainer from './containers/MainContainer'

function App (): ReactElement {
  return (
    <div>
      <div id="app-container">
        <div className="header">
          <div className="center-container">
            <div className="logo-container">
              <img src={logo} alt="shiny charizard logo" id="logo" />
            </div>
            <h3>FireSpin API</h3>
          </div>
        </div>
        <MainContainer />
      </div>
    </div>
  )
}
export default App
