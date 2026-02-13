"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const auth_1 = require("../utils/auth");
const registerUser = async (email, password, name) => {
    const existingUser = await prisma_1.default.user.findUnique({ where: { email } });
    if (existingUser) {
        const error = new Error('User already exists');
        error.statusCode = 400;
        throw error;
    }
    const hashedPassword = await (0, auth_1.hashPassword)(password);
    return await prisma_1.default.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await prisma_1.default.user.findUnique({ where: { email } });
    if (!user || !(await (0, auth_1.comparePassword)(password, user.password))) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
    }
    const token = (0, auth_1.generateToken)({ id: user.id, email: user.email });
    return { user, token };
};
exports.loginUser = loginUser;
