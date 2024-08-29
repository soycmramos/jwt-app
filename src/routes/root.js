import { Router } from 'express'

const router = Router()

import root from '../controllers/root.js'

router.get('/', root)

export default router
