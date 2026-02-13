import { Response } from 'express'
import { AuthRequest } from '../middleware/authMiddleware'
import * as dashboardService from '../services/dashboardService'

export const getMetrics = async (req: AuthRequest, res: Response) => {
  const metrics = await dashboardService.getDashboardMetrics(req.user!.id)
  res.status(200).json(metrics)
}
