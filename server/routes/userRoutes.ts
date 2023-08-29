import express, { type Router } from 'express'
import userController from '../controllers/userController'

const router: Router = express.Router()

router.post('/login', userController.userLogin)

router.post('/signup', userController.userSignup)
