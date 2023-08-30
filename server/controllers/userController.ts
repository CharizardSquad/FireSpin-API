import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'
import path from 'path'
import User from '../models/User'
import { type ErrorObject } from '../../types'

dotenv.config({ path: path.join(__dirname, '.env') })

// eslint-disable-next-line max-len
const createErr = (errInfo: { method: string, type: string, err: object | string }): ErrorObject => {
  const { method, type, err } = errInfo
  return {
    log: `userController.${method} ${type}: ERROR: ${
        typeof err === 'object' ? JSON.stringify(err) : err
      }`,
    message: {
      err: `Error occurred in userController.${method}. Check server logs for more details.`
    }
  }
}

const secretKey = process.env.SECRET_KEY ?? ''

const userController = {
  userLogin: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ where: { username } })
      if (user != null) {
        const passwordMatch: boolean = await bcrypt.compare(password, user.password)
        if (passwordMatch) {
          const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '3h' })
          res.locals.token = token
          res.locals.redirect = '/home'
        } else {
          res.locals.redirect = '/login'
        }
      } else {
        res.locals.redirect = '/signup'
      }
      next()
    } catch (err) {
      next(
        createErr({
          method: 'userLogin',
          type: 'login process',
          err: err as string | object
        })
      )
    }
  },
  userSignup: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ where: { username: username } })
      res.locals.redirect = '/login'
      if (user === null) {
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({ username: username, password: hashedPassword })
      }
      next()
    } catch (err) {
      next(
        createErr({
          method: 'userSignup',
          type: 'signup process',
          err: err as string | object
        })
      )
    }
  }
}

export default userController
