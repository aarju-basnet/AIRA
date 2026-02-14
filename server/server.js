
const express = require('express')
const server = express()

server.set('trust proxy', 1);

const helmet = require('helmet')
const{globalLimiter} = require('./Middlewares/rateLimiters')
const dotenv =require('dotenv')
dotenv.config()
const authRoutes = require('./Routes/authRoutes')
const chatRoutes = require('./Routes/chatRoutes')

const DbConnection  = require('./config/config')

DbConnection()
const cookieParser = require('cookie-parser')
const cors = require('cors')


server.use(express.json())
server.use(helmet())
server.use(cookieParser())

server.use(globalLimiter)

const FRONTEND_URL = process.env.FRONTEND_URL;
server.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
)


server.get('/', (req,res)=>{
    res.send("Server is live")
})

server.use('/user', authRoutes)
server.use('/chat', chatRoutes)


const port = process.env.PORT 
server.listen(port, ()=>{
    console.log(`server is running on the port ${port}`)
})