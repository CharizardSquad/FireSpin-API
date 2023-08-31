import axios from 'axios'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'
import API from '../models/API'
import User from '../models/User'
import ResponseTime from '../models/ResponseTime'
import { type ErrorObject } from '../../types/types'

// eslint-disable-next-line max-len
const createErr = (errInfo: { method: string, type: string, err: object | string }): ErrorObject => {
  const { method, type, err } = errInfo
  return {
    log: `userController.${method} ${type}: ERROR: ${
        typeof err === 'object' ? JSON.stringify(err) : err
      }`,
    message: {
      err: `Error occurred in apiController.${method}. Check server logs for more details.`
    }
  }
}

const secretKey = process.env.SECRET_KEY ?? ''

// get data from input api
const apiController = {
  getApiData: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { url, calls } = req.body
      const token = req.headers.authorization as string
      const decodedToken = jwt.verify(token, secretKey) as JwtPayload
      const { userId } = decodedToken

      let api = await API.findOne({ where: { url } })
      if (api === null) {
        // Create a new API if not found
        api = await API.create({ url })
      }
      // Associate the API with the user if not already associated
      const user = await User.findByPk(userId)
      if (user !== null) {
        const isApiAssociated = await user.hasAPI(api)
        if (!isApiAssociated) {
          await user.addAPI(api)
        }
        const APIId = api.id
        const responseArr: number[] = []
        // Fetch the API data and calculate response time
        const apiRequests = Array.from({ length: calls }, async () => {
          const startTime = new Date().getTime()
          await axios.get(url)
          const endTime = new Date().getTime()
          const responseTime = endTime - startTime
          responseArr.push(responseTime)
          await ResponseTime.create({
            time: responseTime,
            APIId: APIId,
            UserId: user.id
          })
        })
        await Promise.all(apiRequests)
        res.locals.responseTimes = responseArr
      }
      next()
    } catch (err) {
      next(
        createErr({
          method: 'getApiData',
          type: 'api fetch',
          err: err as string | object
        })
      )
    }
  },
  getApiHistory: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization as string
      const decodedToken = jwt.verify(token, secretKey) as JwtPayload
      const { userId } = decodedToken

      const user = await User.findByPk(userId)
      if (user !== null) {
        const APIs = await user.getAPIs()
        const apiHistoryPromises = APIs.map(async (api: API) => {
          const responseTimes: ResponseTime[] = await api.getResponseTimes({
            where: {
              UserId: user.id
            }
          })
          const responseTimesArray = responseTimes.map((rt) => rt.time)
          const numCalls = responseTimesArray.length
          const totalResponseTime = responseTimesArray.reduce((sum, time) => sum + time, 0)
          const averageResponseTime = numCalls === 0 ? 0 : totalResponseTime / numCalls

          return {
            APIId: api.id,
            apiUrl: api.url,
            numberOfCalls: numCalls,
            averageResponseTime,
            responseTimesArray
          }
        })
        const apiHistory: any[] = await Promise.all(apiHistoryPromises)
        res.locals.apiHistory = apiHistory
      }
      next()
    } catch (err) {
      next(
        createErr({
          method: 'deleteApiHistory',
          type: 'api fetch',
          err: err as string | object
        })
      )
    }
  },
  deleteApiHistory: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization as string
      const { APIId } = req.body
      console.log('hi from delete api', APIId)
      const decodedToken = jwt.verify(token, secretKey) as JwtPayload
      const { userId } = decodedToken
      const user = await User.findByPk(userId)
      if (user !== null) {
        const responseTimes = await ResponseTime.findAll({
          where: {
            APIId: APIId,
            UserId: userId
          }
        })
        // Delete the associated response time entries
        await Promise.all(responseTimes.map(async (rt: ResponseTime) => {
          await rt.destroy()
        }))
        // Remove the API association from the user
        await user.removeAPI(APIId)
      }
      next()
    } catch (err) {
      next(
        createErr({
          method: 'deleteApiHistory',
          type: 'api deletion',
          err: err as string | object
        })
      )
    }
  }
}

export default apiController
