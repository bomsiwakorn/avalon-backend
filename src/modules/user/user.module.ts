import express from 'express'
const router = express.Router()

import { UserController } from './controllers/user.controller'
const todoController = new UserController()

export default router
