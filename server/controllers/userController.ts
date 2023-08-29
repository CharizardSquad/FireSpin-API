import bcrypt from 'bycrypt'
import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction, RequestHandler } from 'express'
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
      err: `Error occurred in authenticationController.${method}. Check server logs for more details.`
    }
  }
}

const secretKey = process.env.SECRET_KEY ?? ''
// generate a JWT token for the user
const generateAuthToken = (userId: string): string => jwt.sign({ userId }, secretKey, { expiresIn: '1h' })

const userController = {
  userLogin: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ where: { username } })
      if (user != null) {
        const passwordMatch: boolean = await bcrypt.compare(password, user.password)
        if (passwordMatch) {
          const token = generateAuthToken(user.id)
          res.status(200).json({ token, redirect: '/home' })
        } else {
          res.status(400).json({ redirect: '/login' })
        }
      } else {
        res.status(400).json({ redirect: '/signup' })
      }
    } catch (err) {
      next(
        createErr({
          method: 'userLogin',
          type: 'login process',
          err
        })
      )
    }
  },
  userSignup: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ where: { username } })
      if (user != null) {
        res.status(400).json({ redirect: '/login' })
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      await User.create({ username, password: hashedPassword })
      res.status(200).json({ redirect: '/login' })
    } catch (err) {
      next(
        createErr({
          method: 'userLogin',
          type: 'login process',
          err
        })
      )
    }
  }
}

export default userController
