import prisma from '../config/prisma'

export const getAllLeads = async (userId: string) => {
  return await prisma.lead.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
}

export const getLeadById = async (id: string, userId: string) => {
  const lead = await prisma.lead.findUnique({ where: { id } })

  if (!lead || lead.userId !== userId) {
    const error: any = new Error('Lead not found')
    error.statusCode = 404
    throw error
  }

  return lead
}

export const createLead = async (userId: string, data: any) => {
  return await prisma.lead.create({
    data: {
      ...data,
      userId,
    },
  })
}

export const updateLead = async (id: string, userId: string, data: any) => {
  // Ensure owner
  await getLeadById(id, userId)

  return await prisma.lead.update({
    where: { id },
    data,
  })
}

export const deleteLead = async (id: string, userId: string) => {
  // Ensure owner
  await getLeadById(id, userId)

  return await prisma.lead.delete({ where: { id } })
}
