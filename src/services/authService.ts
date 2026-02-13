import prisma from '../config/prisma'
import { hashPassword, comparePassword, generateToken } from '../utils/auth'

export const registerUser = async (
  email: string,
  password: string,
  name: string,
) => {
  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) {
    const error: any = new Error('User already exists')
    error.statusCode = 400
    throw error
  }

  const hashedPassword = await hashPassword(password)

  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })
}

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !(await comparePassword(password, user.password))) {
    const error: any = new Error('Invalid credentials')
    error.statusCode = 401
    throw error
  }

  const token = generateToken({ id: user.id, email: user.email })

  return { user, token }
}
