import { Router } from 'express'
import signup from '../../controllers/auth/signup.js'
import signin from '../../controllers/auth/signin.js'
import signout from '../../controllers/auth/signout.js'

const router = Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)

export default router
