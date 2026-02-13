import prisma from '../config/prisma'

export const getDashboardMetrics = async (userId: string) => {
  const [totalLeads, leadsByStatus, revenueResult] = await Promise.all([
    prisma.lead.count({ where: { userId } }),
    prisma.lead.groupBy({
      by: ['status'],
      where: { userId },
      _count: { _all: true },
    }),
    prisma.lead.aggregate({
      where: {
        userId,
        status: 'WON',
      },
      _sum: {
        value: true,
      },
    }),
  ])

  // Format leadsByStatus for better API response
  const statusBreakdown = leadsByStatus.reduce((acc: any, curr: any) => {
    acc[curr.status] = curr._count._all
    return acc
  }, {})

  return {
    totalLeads,
    totalRevenue: revenueResult._sum.value || 0,
    leadsByStatus: statusBreakdown,
  }
}
