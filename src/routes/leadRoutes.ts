import { Router } from 'express'
import * as leadController from '../controllers/leadController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = Router()

// All lead routes are protected
router.use(authMiddleware)

router.get('/', leadController.getLeads)
router.post('/', leadController.createLead)
router.get('/:id', leadController.getLead)
router.patch('/:id', leadController.updateLead)
router.delete('/:id', leadController.deleteLead)

export default router
