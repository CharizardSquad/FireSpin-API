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
    console.log('userSignup line 55')
    try {
      const { username, password } = req.body
      console.log('Username:', username)
      console.log('Password:', password)
      console.log('userSignup line 58')
      const user = await User.findOne({ where: { username: username } })
      res.locals.redirect = '/login'
      if (user === null) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ username: username, password: hashedPassword })
        console.log(newUser)
      }
      next()
    } catch (err) {
      console.error(err)
      next(
        createErr({
          method: 'userLogin',
          type: 'login process',
          err: err as string | object
        })
      )
    }
  }
}

export default userController
