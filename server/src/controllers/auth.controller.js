import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../middleware/errorHandler.js";
import { z } from "zod";
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
});
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});
export const register = async (req, res, next) => {
    try {
        const validatedData = registerSchema.parse(req.body);
        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email }
        });
        if (existingUser) {
            throw new AppError("Email already registered with TZT mesh.", 400);
        }
        const hashedPassword = await bcrypt.hash(validatedData.password, 12);
        const user = await prisma.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
            }
        });
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: "24h",
        });
        res.status(201).json({
            status: "success",
            token,
            data: { user },
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return next(new AppError(error.issues[0]?.message || "Validation Error", 400));
        }
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        const user = await prisma.user.findUnique({
            where: { email: validatedData.email }
        });
        if (!user || !user.password) {
            throw new AppError("Invalid credentials provided to the mesh.", 401);
        }
        const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
        if (!isPasswordValid) {
            throw new AppError("Invalid credentials provided to the mesh.", 401);
        }
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: "24h",
        });
        res.status(200).json({
            status: "success",
            token,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            return next(new AppError(error.issues[0]?.message || "Validation Error", 400));
        }
        next(error);
    }
};
//# sourceMappingURL=auth.controller.js.map