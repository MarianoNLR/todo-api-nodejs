import express from 'express'
import { login, register, logout, getUser} from '../controllers/userController.js'
import { authUser } from '../middlewares/authUser.js'

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/logout', logout)
userRouter.get('/:id', getUser)

export default userRouter