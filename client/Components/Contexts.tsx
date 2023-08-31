import React, { createContext, type Dispatch, type SetStateAction } from 'react'
import type { HistoryData } from '../../types/types'

// export const GlobalContext = createContext({
//   historyData: [] as HistoryData[],
//   setHistoryData: (data: HistoryData[]) => {}
// })

// export interface GlobalContextInterace {
//   globalServices?: globalServiceObj[]
//   setGlobalServices?: Dispatch<SetStateAction<globalServiceObj[]>>
// }

// export const GlobalContext = createContext({})

interface GlobalContextInterface {
  historyData: HistoryData[]
  setHistoryData: Dispatch<SetStateAction<HistoryData[]>> // correctly typed history data
  selectedDataset: string
  setSelectedDataset: Dispatch<React.SetStateAction<string>>
}

export const GlobalContext = createContext<GlobalContextInterface>({
  historyData: [],
  setHistoryData: () => {},
  selectedDataset: '',
  setSelectedDataset: () => {},
})
