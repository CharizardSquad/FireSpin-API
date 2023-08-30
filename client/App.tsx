import React, { type ReactElement, useState, type Dispatch, type SetStateAction, useMemo } from 'react'
import logo from './assets/logo.png'
import './sass/App.scss'
import MainContainer from './containers/MainContainer'
// import GBA frsom './assets/GBA.png'
import { GlobalContext } from './Components/Contexts'
import type { HistoryProps, HistoryData } from '../types/types'
// import Dropdown from './Components/Dropdown'

function App (): ReactElement {
  // const [historyData, setHistoryData] = useState<HistoryData[]>([])
  const [historyData, setHistoryData] = useState([])
  const [selectedDataset, setSelectedDataset] = useState<string>('')

  return (
    // <GlobalContext.Provider value={{
    //   historyData: historyData as HistoryData[],
    //   setHistoryData: setHistoryData as Dispatch<SetStateAction<HistoryData[]>>,
    //   selectedDataset,
    //   setSelectedDataset,
    //   }}>
    <GlobalContext.Provider
      // value={useMemo(() => ({
      //   historyData,
      //   setHistoryData: setHistoryData as Dispatch<SetStateAction<HistoryData[]>>,
      //   selectedDataset,
      //   setSelectedDataset
      // }), [historyData, setHistoryData, selectedDataset, setSelectedDataset])}
      value={{
        historyData,
        setHistoryData: setHistoryData as Dispatch<SetStateAction<HistoryData[]>>,
        selectedDataset,
        setSelectedDataset
      }}
    >
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
    </GlobalContext.Provider>
  )
}
export default App

//   return (
//     <
//   <GlobalContext.Provider
//     value={{
// historyData,
// setHistoryData
//     }}
//     <div id="app-container">
//       <div className="header">
//         <div className="center-container">
//           <div className="logo-container">
//             <img src={logo} alt="shiny charizard logo" id="logo" />
//           </div>
//           <h3>FireSpin API</h3>
//         </div>
//       </div>
//       <MainContainer />
//     </div>
//     </GlobalContext.Provider>
//     />
//   )
// }
