"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateLead = exports.createLead = exports.getLeadById = exports.getAllLeads = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAllLeads = async (userId) => {
    return await prisma_1.default.lead.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });
};
exports.getAllLeads = getAllLeads;
const getLeadById = async (id, userId) => {
    const lead = await prisma_1.default.lead.findUnique({ where: { id } });
    if (!lead || lead.userId !== userId) {
        const error = new Error('Lead not found');
        error.statusCode = 404;
        throw error;
    }
    return lead;
};
exports.getLeadById = getLeadById;
const createLead = async (userId, data) => {
    return await prisma_1.default.lead.create({
        data: {
            ...data,
            userId,
        },
    });
};
exports.createLead = createLead;
const updateLead = async (id, userId, data) => {
    // Ensure owner
    await (0, exports.getLeadById)(id, userId);
    return await prisma_1.default.lead.update({
        where: { id },
        data,
    });
};
exports.updateLead = updateLead;
const deleteLead = async (id, userId) => {
    // Ensure owner
    await (0, exports.getLeadById)(id, userId);
    return await prisma_1.default.lead.delete({ where: { id } });
};
exports.deleteLead = deleteLead;
