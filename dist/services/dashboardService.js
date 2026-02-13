"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardMetrics = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getDashboardMetrics = async (userId) => {
    const [totalLeads, leadsByStatus, revenueResult] = await Promise.all([
        prisma_1.default.lead.count({ where: { userId } }),
        prisma_1.default.lead.groupBy({
            by: ['status'],
            where: { userId },
            _count: { _all: true },
        }),
        prisma_1.default.lead.aggregate({
            where: {
                userId,
                status: 'WON',
            },
            _sum: {
                value: true,
            },
        }),
    ]);
    // Format leadsByStatus for better API response
    const statusBreakdown = leadsByStatus.reduce((acc, curr) => {
        acc[curr.status] = curr._count._all;
        return acc;
    }, {});
    return {
        totalLeads,
        totalRevenue: revenueResult._sum.value || 0,
        leadsByStatus: statusBreakdown,
    };
};
exports.getDashboardMetrics = getDashboardMetrics;
