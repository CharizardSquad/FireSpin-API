import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import type { ServerError } from '../types'
import API from './models/API'
import User from './models/User'
import ResponseTime from './models/ResponseTime'
import sequelize from './db'
// import apiRouter from './routers/apiRouter'

const PORT = 3000

const app = express()
app.use(express.json())

// general endpoint for routes
// app.use('/api', apiRouter)

// error handler for bad routes/requests to backend
app.use((req, res) => {
  res.sendStatus(404)
})

User.belongsToMany(API, { through: 'UserApi' })
API.belongsToMany(User, { through: 'UserApi' })
API.hasMany(ResponseTime)
ResponseTime.belongsTo(API)

void (async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')

    // Synchronize each model with the database
    await User.sync()
    await API.sync()
    await ResponseTime.sync()
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
