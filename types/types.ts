// import type { RequestHandler } from 'express'
export interface ServerError {
  err: '400'
}

export interface ErrorObject {
  log: string
  message: { err: string }
}

export interface HistoryProps {
  closeModal: () => void
}

export interface HistoryData {
  apiUrl: string
  averageResponseTime: number
  numberOfCalls: number
}
