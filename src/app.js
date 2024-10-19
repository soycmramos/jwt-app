import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import express from 'express'
import cookieParser from 'cookie-parser'
import EJSLayouts from 'express-ejs-layouts'
import { config } from 'dotenv'
import morgan from 'morgan'
import rootRoutes from './routes/root.js'
import authRoutes from './routes/auth/index.js'
import protectedRoutes from './routes/protected/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

config()

const app = express()
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))
app.set('layout', join(__dirname, 'views/layouts/main'))

app.use(EJSLayouts)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')))
app.use(morgan('dev'))

app.use(rootRoutes)
app.use(authRoutes)
app.use(protectedRoutes)

export default app
