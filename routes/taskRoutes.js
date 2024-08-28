import express from 'express'
import { authUser } from '../middlewares/authUser.js'
import {getMyTasks, addTask, update } from '../controllers/taskController.js'

const taskRouter = express.Router()

taskRouter.get('/', getMyTasks)
taskRouter.post('/', addTask)
taskRouter.put('/:taskId', update)

export default taskRouter