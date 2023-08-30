import type { Router, Request, Response, NextFunction } from 'express'
import express from 'express'
import userController from '../controllers/userController'

const router: Router = express.Router()

router.post('/login', userController.userLogin, (req: Request, res: Response, next: NextFunction) => {
  res.locals.token !== undefined
    ? res.status(res.locals.status).json({ token: res.locals.token, redirect: res.locals.redirect })
    : res.status(res.locals.status).json({ redirect: res.locals.redirect })
})

router.post('/signup', userController.userSignup, (req: Request, res: Response, next: NextFunction) => {
  res.status(res.locals.status).json({ redirect: res.locals.redirect })
})

export default router
