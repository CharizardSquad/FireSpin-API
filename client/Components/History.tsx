import React, { useState, useEffect, type ReactElement, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import type { HistoryProps, HistoryData } from '../../types/types'
import { GlobalContext } from './Contexts'

function History ({ closeModal }: HistoryProps): ReactElement {
  const location = useLocation()
  const { historyData, setHistoryData } = useContext(GlobalContext)
  // const [entries, setEntries] = useState(historyData)
  const token = location.state?.token
  console.log('token in history:', token)

  const handleDeleteEntry = async (APIId: number): Promise<void> => {
    // const entryToDelete = entries[index]
    console.log('apiid:', APIId)

    try {
      // Send a delete request to the backend API
      const response = await fetch('/api/delete', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        },
        body: JSON.stringify({ APIId })
      })

      if (response.ok) {
        const updatedHistoryData = historyData.filter((entry) => entry.APIId !== APIId)
        setHistoryData(updatedHistoryData)
      } else {
        console.error('Error deleting entry')
      }
    } catch (error) {
      console.error('Error deleting entry', error)
    }
  }

  const fetchHistoryData = async (): Promise<void> => {
    try {
      const response = await fetch('/api/history', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
      if (response.ok) {
        const data = await response.json()
        console.log('history data:', data)
        setHistoryData(data)
      } else {
        console.error('Error fetching history data')
      }
    } catch (error) {
      console.log('Error fetching history', error)
    }
  }

  useEffect(() => {
    fetchHistoryData()
  }, [token])

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 id="modalText">History</h2>
        <button type="button" onClick={closeModal}>
          Close
        </button>
        <div className="history-entries">
          {historyData.map((entry, index) => (
            <div key={uuidv4()} className="history-entry">
              <div>
                API:
                {' '}
                {entry.apiUrl}
              </div>
              <div>
                Average:
                {' '}
                {entry.averageResponseTime}
              </div>
              <div>
                Calls:
                {' '}
                {entry.numberOfCalls}
              </div>
              <button type="button" onClick={async () => { await handleDeleteEntry(entry.APIId) }}>DELETE</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default History
