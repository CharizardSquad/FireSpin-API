import React, { useState, type ReactElement } from 'react'
import type { HistoryProps } from '../../types'

function History ({ closeModal }: HistoryProps): ReactElement {
  return (

    <div className="modal">
      <div className="modal-content">
        History Modal
        <button type="button" onClick={closeModal}>Close</button>
      </div>

    </div>
  )
}

export default History
