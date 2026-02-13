import { Router } from 'express'
import * as dashboardController from '../controllers/dashboardController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

router.use(authMiddleware)

router.get('/', dashboardController.getMetrics)

export default router
