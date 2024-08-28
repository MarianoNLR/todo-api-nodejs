import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import taskRouter from './routes/taskRoutes.js'
import userRouter from './routes/userRoutes.js'
import './mongo.js'

const app = express()

const PORT = process.env.PORT ?? 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cors({
    origin: '*',
    credentials: true
}))

app.use('/user', userRouter)
app.use('/task', taskRouter)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log('Server listening on http://localhost:3000')
})