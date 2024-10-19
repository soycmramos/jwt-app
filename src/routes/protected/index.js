import { Router } from 'express'

const router = Router()

import home from '../../controllers/protected/home.js'

router.get('/home', home)

export default router
