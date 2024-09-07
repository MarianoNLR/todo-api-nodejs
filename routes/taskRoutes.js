import express from 'express'
import { authUser } from '../middlewares/authUser.js'
import {getMyTasks, addTask, update, getTaskById, newSubtask, deleteTask } from '../controllers/taskController.js'

const taskRouter = express.Router()

taskRouter.patch('/:taskId/newSubtask', authUser, newSubtask)
taskRouter.get('/', authUser, getMyTasks)
taskRouter.get('/:taskId', authUser, getTaskById)
taskRouter.post('/', authUser, addTask)
taskRouter.put('/:taskId', authUser, update)
taskRouter.delete('/:taskId', authUser, deleteTask)

export default taskRouter