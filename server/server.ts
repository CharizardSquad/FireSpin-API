import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import type { ServerError } from '../types/types'
import bodyParser from 'body-parser'
import API from './models/API'
import User from './models/User'
import ResponseTime from './models/ResponseTime'
import sequelize from './db'
import userRoutes from './routes/userRoutes'
import apiRoutes from './routes/apiRoutes'

const PORT = 3000

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// general endpoint for routes
app.use('/api', userRoutes)
app.use('/api', apiRoutes)

// error handler for bad routes/requests to backend
app.use((req, res) => {
  res.sendStatus(404)
})

void (async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')

    User.belongsToMany(API, { through: 'UserApi' })
    API.belongsToMany(User, { through: 'UserApi' })
    API.hasMany(ResponseTime)
    ResponseTime.belongsTo(API, { foreignKey: 'APIId', as: 'api' })

    // Synchronize each model with the database
    await sequelize.sync()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
})()

// create get request
app.get('/getTest', (req, res) => {

})
// global error handler for all middleware and routes
app.use((err: ServerError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Error caught in global handler',
    status: 500,
    message: { err: 'An error occurred' }
  }
  const errorObj = { ...defaultErr, ...err }
  console.log(errorObj.log)
  console.log(err)
  return res.status(errorObj.status).json(errorObj.message)
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })
}
export default app
