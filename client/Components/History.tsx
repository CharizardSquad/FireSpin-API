import React, { useState, useEffect, type ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import type { HistoryProps, HistoryData } from '../../types/types'

function History ({ closeModal }: HistoryProps): ReactElement {
  const location = useLocation()
  const [historyData, setHistoryData] = useState<HistoryData[]>([])
  // const [entries, setEntries] = useState(historyData)
  const token = location.state?.token
  console.log('token in history:', token)

  // const handleDeleteEntry = async (index: number) => {
  //   const entryToDelete = entries[index]

  //   try {
  //     // Send a delete request to the backend API
  //     const response = await fetch(`/api/delete/${xxx}`, {
  //       method: 'DELETE',
  //       credentials: 'include',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })

  //     if (response.ok) {
  //       const updatedEntries = entries.filter((_, i) => i !== index);
  //       setEntries(updatedEntries)
  //     } else {
  //       console.error('Error deleting entry');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting entry', error);
  //   }
  // }

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
        <h2>History Modal</h2>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default History
