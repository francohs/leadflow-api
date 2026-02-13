import { Request, Response } from 'express'
import * as authService from '../services/authService'

export const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const user = await authService.registerUser(email, password, name)
  res.status(201).json({
    message: 'User registered successfully',
    user: { id: user.id, email: user.email, name: user.name },
  })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password' })
  }

  const { user, token } = await authService.loginUser(email, password)
  res.status(200).json({
    message: 'Login successful',
    user: { id: user.id, email: user.email, name: user.name },
    token,
  })
}
