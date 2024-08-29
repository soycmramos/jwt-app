import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import express from 'express'
import cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import rootRoutes from './routes/root.js'
import authRoutes from './routes/auth/index.js'
import protectedRoutes from './routes/protected/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

config()

const app = express()

app.set('port', process.env.PORT || 3000)
app.set('view engine', 'pug')
app.set('views', join(__dirname, 'views'))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')))

app.use(rootRoutes)
app.use(authRoutes)
app.use(protectedRoutes)

export default app
