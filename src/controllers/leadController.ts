import { Response } from 'express'
import { AuthRequest } from '../middleware/authMiddleware'
import * as leadService from '../services/leadService'

export const getLeads = async (req: AuthRequest, res: Response) => {
  const leads = await leadService.getAllLeads(req.user!.id)
  res.status(200).json(leads)
}

export const getLead = async (req: AuthRequest, res: Response) => {
  const lead = await leadService.getLeadById(
    req.params.id as string,
    req.user!.id,
  )
  res.status(200).json(lead)
}

export const createLead = async (req: AuthRequest, res: Response) => {
  const { firstName, lastName, email, phone, status, value, notes } = req.body

  if (!firstName || !lastName || !email) {
    return res
      .status(400)
      .json({ message: 'Missing required lead information' })
  }

  const lead = await leadService.createLead(req.user!.id, {
    firstName,
    lastName,
    email,
    phone,
    status,
    value: value ? parseFloat(value) : 0,
    notes,
  })

  res.status(201).json(lead)
}

export const updateLead = async (req: AuthRequest, res: Response) => {
  const lead = await leadService.updateLead(
    req.params.id as string,
    req.user!.id,
    req.body,
  )
  res.status(200).json(lead)
}

export const deleteLead = async (req: AuthRequest, res: Response) => {
  await leadService.deleteLead(req.params.id as string, req.user!.id)
  res.status(204).send()
}
