import type { Router, Request, Response, NextFunction } from 'express'
import express from 'express'
import apiController from '../controllers/apiController'

const router: Router = express.Router()

router.post('/add', apiController.getApiData, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals.responseTimes)
})

router.post('/history', apiController.getApiHistory, (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(res.locals.apiHistory)
})

export default router
