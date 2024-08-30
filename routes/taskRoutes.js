import express from 'express'
import { authUser } from '../middlewares/authUser.js'
import {getMyTasks, addTask, update, getTaskById } from '../controllers/taskController.js'

const taskRouter = express.Router()

taskRouter.get('/', authUser, getMyTasks)
taskRouter.get('/:taskId', authUser, getTaskById)
taskRouter.post('/', authUser, addTask)
taskRouter.put('/:taskId', authUser, update)

export default taskRouter