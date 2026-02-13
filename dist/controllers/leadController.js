"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateLead = exports.createLead = exports.getLead = exports.getLeads = void 0;
const leadService = __importStar(require("../services/leadService"));
const getLeads = async (req, res) => {
    const leads = await leadService.getAllLeads(req.user.id);
    res.status(200).json(leads);
};
exports.getLeads = getLeads;
const getLead = async (req, res) => {
    const lead = await leadService.getLeadById(req.params.id, req.user.id);
    res.status(200).json(lead);
};
exports.getLead = getLead;
const createLead = async (req, res) => {
    const { firstName, lastName, email, phone, status, value, notes } = req.body;
    if (!firstName || !lastName || !email) {
        return res
            .status(400)
            .json({ message: 'Missing required lead information' });
    }
    const lead = await leadService.createLead(req.user.id, {
        firstName,
        lastName,
        email,
        phone,
        status,
        value: value ? parseFloat(value) : 0,
        notes,
    });
    res.status(201).json(lead);
};
exports.createLead = createLead;
const updateLead = async (req, res) => {
    const lead = await leadService.updateLead(req.params.id, req.user.id, req.body);
    res.status(200).json(lead);
};
exports.updateLead = updateLead;
const deleteLead = async (req, res) => {
    await leadService.deleteLead(req.params.id, req.user.id);
    res.status(204).send();
};
exports.deleteLead = deleteLead;
